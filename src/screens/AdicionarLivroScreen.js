import React from "react";
import {Button, StyleSheet, Text, TextInput, View} from "react-native";
import {MaterialIcons} from '@expo/vector-icons'


export default class AdicionarLivroScreen extends React.Component {

  static navigationOptions = {
    title: 'Adicionar Livro',
    headerStyle: {
      backgroundColor: '#00897B',
      elevation: 0,
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  constructor(props) {
    super(props);
    const {params} = this.props.navigation.state;
    const inputLista = params ? params.titulo : null;
    const adicionarLivro = params ? params.onSubmit : null;

    this.state = {
      titulo: inputLista,
      autor: "",
      data: "",
      capa: "",
      pdf: "",
      loja: "",
      adicionarLivro: adicionarLivro,
    };
  }

  salvarSala = () => {
    let livro = {
      titulo: this.state.titulo,
      autor: this.state.autor,
      data: this.state.data,
      capa: this.state.capa,
      pdf: this.state.pdf,
      loja: this.state.loja
    };
    let adicionarLivro = this.state.adicionarLivro;
    console.log(adicionarLivro.type);
    adicionarLivro(livro);

    this.props.navigation.goBack()
  };

  componentDidMount = () => {
    this.focusNextField('titulo')
  };

  focusNextField(nextField) {
    this.refs[nextField].focus()
  };


  render() {
    return (
      <View
        style={styles.container}>
        <View style={styles.card}>
          <View
            style={styles.infoTextoContainer}>

            <Text style={[styles.textoLabel, styles.textoTopo]}>
              Insira as informações abaixo para adicionar um livro:
            </Text>

            <View
              style={styles.campoContainer}>

              <MaterialIcons
                name={'book'}
                size={30}
                color={'#4b4b4b'}/>

              <View
                style={styles.textoContainer}>

                <Text
                  style={styles.textoLabel}>
                  Título:
                </Text>

                <TextInput
                  ref='titulo'
                  style={styles.inputStyle}
                  value={this.state.titulo}
                  error={"Insira um valor para o título"}
                  onChangeText={(titulo) => this.setState({titulo})}
                  returnKeyType='next'
                  blurOnSubmit={false}
                  onSubmitEditing={() => this.focusNextField('autor')}/>
              </View>

            </View>

            <View
              style={styles.campoContainer}>
              <MaterialIcons
                name={'person'}
                size={30}
                color={'#4b4b4b'}/>

              <View style={styles.textoContainer}>
                <Text
                  style={styles.textoLabel}>
                  Autor:
                </Text>

                <TextInput
                  ref='autor'
                  style={styles.inputStyle}
                  value={this.state.autor}
                  onChangeText={(autor) => this.setState({autor})}
                  returnKeyType='next'
                  blurOnSubmit={false}
                  onSubmitEditing={() => this.focusNextField('data')}
                />
              </View>
            </View>

            <View
              style={styles.campoContainer}>
              <MaterialIcons
                name={'today'}
                size={30}
                color={'#4b4b4b'}/>

              <View style={styles.textoContainer}>
                <Text
                  style={styles.textoLabel}>
                  Lançamento:
                </Text>

                <TextInput
                  ref={'data'}
                  style={styles.inputStyle}
                  value={this.state.data}
                  onChangeText={(data) => this.setState({data})}
                  returnKeyType={'next'}
                  blurOnSubmit={false}
                  onSubmitEditing={() => this.focusNextField('loja')}
                />
              </View>
            </View>

            <View
              style={styles.campoContainer}>

              <MaterialIcons
                name={'store'}
                size={30}
                color={'#4b4b4b'}/>

              <View style={styles.textoContainer}>
                <Text
                  style={styles.textoLabel}>
                  Loja:
                </Text>

                <TextInput
                  ref={'loja'}
                  style={styles.inputStyle}
                  value={this.state.loja}
                  onChangeText={(loja) => this.setState({loja})}
                  onSubmitEditing={() => this.salvarSala}
                />

              </View>
            </View>
          </View>

          <View
            style={styles.botaoContainer}>

            <Button
              onPress={this.salvarSala}
              color={"#00897B"}
              title={"Adicionar"}/>

          </View>
        </View>
      </View>
    );
  }

}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00897B',
    padding: 10,
    flex: 1,
  },

  textoTopo: {
    textAlign: 'center',
    padding: 10,
  },

  card: {
    borderRadius: 3,
    backgroundColor: '#fff',
    margin: 5,
    shadowColor: '#000000',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 1,
  },

  textoLabel: {
    fontSize: 12,
    paddingLeft: 2,
    color: '#4b4b4b',
  },

  textoContainer: {
    flex: 1,
    marginLeft: 10,
  },

  infoTextoContainer: {
    paddingLeft: 10,
    paddingEnd: 10,
  },

  campoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },

  inputStyle: {
    paddingBottom: 6,
    paddingLeft: 2,
    fontSize: 18,

  },

  botaoContainer: {
    padding: 20,
  },

});