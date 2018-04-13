import React from "react";
import {Button, StyleSheet, Text, TextInput, View} from "react-native";
import {MaterialIcons} from '@expo/vector-icons'


export default class AdicionarLivroScreen extends React.Component {
  static navigationOptions = {
    title: 'Adicionar Livro',
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
      titulo: "",
      autor: "",
      data: "",
      capa: "",
      pdf: "",
      loja: ""
    };
  }


  render() {
    return (
      <View style={styles.container}>

        <View style={styles.infoTextoContainer}>

          <View
            style={styles.campoContainer}>
            <MaterialIcons name={'book'} size={25} color={'#4b4b4b'}/>

            <View style={styles.textoContainer}>

              <Text
                style={styles.textoLabel}>
                Título:
              </Text>

              <TextInput
                style={styles.inputStyle}
                value={this.state.titulo}
                onChangeText={(titulo) => this.setState({titulo})}/>
            </View>

          </View>

          <View
            style={styles.campoContainer}>
            <MaterialIcons name={'book'} size={25} color={'#4b4b4b'}/>

            <View style={styles.textoContainer}>
              <Text
                style={styles.textoLabel}>
                Autor:
              </Text>

              <TextInput
                style={styles.inputStyle}
                value={this.state.autor}
                onChangeText={(autor) => this.setState({autor})}/>
            </View>
          </View>

          <View
            style={styles.campoContainer}>
            <MaterialIcons name={'book'} size={25} color={'#4b4b4b'}/>

            <View style={styles.textoContainer}>
              <Text
                style={styles.textoLabel}>
                Lançamento:
              </Text>

              <TextInput
                style={styles.inputStyle}
                value={this.state.data}
                onChangeText={(data) => this.setState({data})}
              />
            </View>
          </View>

          <View
            style={styles.campoContainer}>
            <MaterialIcons name={'book'} size={25} color={'#4b4b4b'}/>

            <View style={styles.textoContainer}>
              <Text
                style={styles.textoLabel}>
                Loja:
              </Text>

              <TextInput
                style={styles.inputStyle}
                value={this.state.loja}
                onChangeText={(loja) => this.setState({loja})}/>
            </View>
          </View>
        </View>

        <Button color={"#00897B"} title={"Adicionar"}/>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa',
    padding: 10,
    flex: 1,
  },

  // card: {
  //   borderRadius: 3,
  //   backgroundColor: '#fff',
  //   flexDirection: "row",
  //   margin: 5,
  //   shadowColor: '#000000',
  //   shadowOffset: {width: 2, height: 2},
  //   shadowOpacity: 0.3,
  //   shadowRadius: 1,
  //   elevation: 1,
  //   padding: 5,
  // },


  textoLabel: {
    fontSize: 11,
    color: '#4b4b4b',
  },

  textoContainer: {
    flex: 1,
    marginLeft:10,
  },

  infoTextoContainer: {
    flex: 1
  },

  campoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },

  inputStyle: {
    paddingBottom: 6,
    paddingLeft: 1,
  },

});