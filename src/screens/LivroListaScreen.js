import React from "react";
import {
  AsyncStorage,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator
} from "react-native";
import {livros} from "../modelo/livros"
import LivroItem from "../components/livroItem";
import * as firebase from 'firebase';

//essa parte do código serve para ignorar o warning de timeout do firebsae durante o debug
import {YellowBox} from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

export default class LivroListaScreen extends React.Component {

  static navigationOptions = {
    title: 'Livros',
    headerStyle: {
      backgroundColor: '#00897B',
    },
    headerTintColor: '#ffffff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  constructor(props) {
    super(props);
    this.iniciaFirebase();
    this.state = {
      livros: [],
      input: '',
      carregando: true,
    };
    this.carregaLivros(this);
  }

  iniciaFirebase = () => {
    // Initialize Firebase
    const config = {
      apiKey: "AIzaSyBsfr3rlmZ3rxjYkbzgB2bc6-w90XelOjg",
      authDomain: "livrosreact.firebaseapp.com",
      databaseURL: "https://livrosreact.firebaseio.com",
      projectId: "livrosreact",
      storageBucket: "livrosreact.appspot.com",
      messagingSenderId: "225377100092"
    };

    firebase.initializeApp(config);
  };

  carregaLivros = (context) => {
    let livrosRef = firebase.database().ref('livros');
    livrosRef.on('value', function (snapshot) {
      let livros = snapshot.val();
      context.setState({livros: livros, carregando: false});
    });
  };

  cliqueLivro = (obj) => {
    this.props.navigation.navigate('DetalhesLivro',
      {
        livro: obj.item,
        index: obj.index,
        deletaItem: this.deletarLivro,
        editaItem: this.editarLivro,
      });
  };

  cliqueAdd = () => {
    this.props.navigation.navigate('AdicionarLivro',
      {
        titulo: this.state.input,
        adicionarNovo: this.adicionarLivro
      }
    );
  };

  adicionarLivro = (livro) => {
    const keyNovoLivro = firebase.database().ref().child('livros').push().key;
    let updates = {};
    updates['/livros/' + keyNovoLivro] = livro;
    firebase.database().ref().update(updates);
    this.handleFiles(livro, keyNovoLivro);

    // limpa o campo de adicionar livro na tela de lista
    this.setState({input: ''})
    // this.upload(livro.capa)
  };

  handleFiles = async (livro, keyLivro) => {
    try {
      let updates = {};
      let urlCapa = "";
      let urlPdf = "";
      console.log("handling files");

      if (livro.capa && !livro.capa.startsWith('http')) {
        urlCapa = await this.uploadAsync(livro.capa, keyLivro, 'capa');
        updates['/livros/' + keyLivro + '/capa'] = urlCapa;
      }

      if (livro.pdf && !livro.pdf.startsWith('http')) {
        urlPdf = await this.uploadAsync(livro.pdf, keyLivro, 'pdf');
        updates['/livros/' + keyLivro + '/pdf'] = urlPdf;
        console.log(urlPdf)
      }

      if (updates) {
        firebase.database().ref().update(updates);
      }

    } catch (e) {
      console.log(e);
    }
  };

  uploadAsync = async (uri, keyLivro, tipo) => {
    console.log("uploading");
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = firebase
      .storage()
      .ref()
      .child(keyLivro.toString())
      .child(tipo);

    const snapshot = await ref.put(blob);
    return snapshot.downloadURL;
  };

  deletarLivro = (livro, key) => {
    let updates = {};
    updates['/livros/' + key] = null;
    firebase.database().ref().update(updates);

    // deletar arquivos associados ao livro
    try {
      firebase.storage().refFromURL(livro.capa).delete().then(function () {
        // File deleted successfully
      }).catch(function (error) {
        console.log(error)
      });
    } catch (e) {
    }
    try {
      firebase.storage().refFromURL(livro.pdf).delete().delete().then(function () {
        // File deleted successfully
      }).catch(function (error) {
        console.log(error)
      });
    } catch (e) {
    }
  };

  editarLivro = (livro, key) => {
    this.handleFiles(livro, key);
    let updates = {};
    updates['/livros/' + key] = livro;
    firebase.database().ref().update(updates);
  };

  render() {
    return (
      <View style={styles.container}>
        {/*barra de adicionar livros*/}
        <View style={styles.card}>
          <TextInput
            onChangeText={(input) => this.setState({input})}
            value={this.state.input}
            style={styles.campoAdicionar}
            underlineColorAndroid={'#ccc'}
            placeholder="Adicionar novo livro"
            onSubmitEditing={this.cliqueAdd}/>

          <TouchableOpacity
            onPress={this.cliqueAdd}
            style={styles.botaoAdd}>

            <Text
              style={styles.textoBotao}>
              ADD
            </Text>
          </TouchableOpacity>
        </View>

        {this.state.carregando &&
        <ActivityIndicator style={{marginTop: 10}} size="large" color="#00897B"/>
        }

        <FlatList
          renderItem={obj =>
            <LivroItem
              item={obj.item}
              cliqueLivro={() => this.cliqueLivro(obj)}
            />}

          data={!this.state.livros ? null : Object.keys(this.state.livros)
            .map(key => {
              let livro = this.state.livros[key];
              livro.key = key;
              return livro;
            })}

          extraData={this.state}
          keyExtractor={(item) => (item.key)}/>
      </View>
    );
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa',
    padding: 10,
    flex: 1,
  },

  card: {
    borderRadius: 3,
    backgroundColor: '#fff',
    flexDirection: "row",
    margin: 5,
    shadowColor: '#000000',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 1,
    padding: 5,
  },

  campoAdicionar: {
    flex: 6,
    paddingLeft: 4,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 10,

  },

  botaoAdd: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },

  textoBotao: {
    color: '#00897B'
  }
});