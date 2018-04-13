import React from "react";
import {AsyncStorage, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, View} from "react-native";
import {livros} from "../modelo/livros"
import LivroItem from "../components/livroItem";

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
    this.state = {
      livros: livros,
      input: '',
    };
  }

  cliqueLivro = (item) => {
    this.props.navigation.navigate('DetalhesLivro', {livro: item});
  };

  cliqueAdd = () => {
    this.props.navigation.navigate('AdicionarLivro', {titulo: this.state.input});
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
            placeholder="Adicionar novo livro"/>

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
              cliqueLivro={() => this.cliqueLivro(obj.item)}/>}
          data={this.state.livros}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }

  _showMoreApp = () => {
    this.props.navigation.navigate('Other');
  };

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