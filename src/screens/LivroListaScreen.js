import React from "react";
import {AsyncStorage, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, View} from "react-native";
import {livros} from "../modelo/livros"
import LivroItem from "../components/livroItem";
import * as firebase from 'firebase';

export default class LivroListaScreen extends React.Component {

  static navigationOptions = {
    title: 'Livros',
    headerStyle: {
      backgroundColor: '#00897B',
    },
    headerTintColor: '#fff',
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
    };
    this.carregaLivros(this);
  }

  iniciaFirebase = () => {
    // Initialize Firebase
    const firebaseConfig = {
      apiKey: "AIzaSyC1vD3B8VDTU33pau6XtbtoSxG1Nr8TXAQ",
      authDomain: "testappionic-93bec.firebaseapp.com",
      databaseURL: "https://testappionic-93bec.firebaseio.com",
      projectId: "testappionic-93bec",
      storageBucket: "testappionic-93bec.appspot.com",
      messagingSenderId: "335082067236"
    };

    firebase.initializeApp(firebaseConfig);
  };

  carregaLivros = (context) => {
    let livrosRef = firebase.database().ref('livro');
    livrosRef.on('value', function (snapshot) {
      // let keys = Object.keys(snapshot.val());
      // let livros = keys.map(key => {
      //   let livro = snapshot.val()[key];
      //   livro.key = key;
      //   return livro;
      // });
      let livros = snapshot.val();
      console.log(Object.keys(livros));
      context.setState({livros: livros});

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


    this.setState(prevState => (
      {
        input: '',
        livros: [...prevState.livros, (livro)]
      }))
  };

  deletarLivro = (livro) => {
    this.setState(prevState => {
      prevState.livros.splice(livro, 1);
      return ({livros: prevState.livros})
    })
  };

  editarLivro = (livro, index) => {
    this.setState(prevState => {
      prevState.livros[index] = livro;
      return ({livros: prevState.livros})
    })
  };

  render() {
    return (
      <View style={styles.container}>

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

        <FlatList
          renderItem={obj =>
            <LivroItem
              item={obj.item}
              cliqueLivro={() => this.cliqueLivro(obj)}
            />}

          data={Object.keys(this.state.livros)
            .map(key => {
              let livro = this.state.livros[key];
              livro.key = key;
              return livro;
            })}

          extraData={this.state}
          keyExtractor={(item, index) => (item.key)}/>
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