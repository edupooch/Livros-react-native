import React from "react";
import {Image, ImageBackground, StyleSheet, Text, View} from "react-native";

export default class LivroScreen extends React.Component {
  static navigationOptions = {
    title: 'Livro',
    headerStyle: {
      backgroundColor: '#00897B',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  render() {
    const {params} = this.props.navigation.state;
    const livro = params ? params.livro : null;

    return (
      <View
        style={styles.container}>

        <ImageBackground
          source={livro.capa}
          style={styles.card}>

          <View style={styles.infoContainer}>

            <Image source={livro.capa}
                   style={styles.capa}/>

            <View style={styles.infoTextoContainer}>

              <View
                style={styles.campoContainer}>
                <Text
                  style={styles.textoLabel}>
                  Título:
                </Text>

                <Text
                  style={styles.textoValor}>
                  {livro.titulo}
                </Text>
              </View>

              <View
                style={styles.campoContainer}>
                <Text
                  style={styles.textoLabel}>
                  Autor:
                </Text>

                <Text
                  style={styles.textoValor}>
                  {livro.autor}
                </Text>
              </View>

              <View
                style={styles.campoContainer}>

                <Text
                  style={styles.textoLabel}>
                  Lançamento:
                </Text>

                <Text
                  style={styles.textoValor}>
                  {livro.data}
                </Text>
              </View>

              <View
                style={styles.campoContainer}>
                <Text
                  style={styles.textoLabel}>
                  Loja:
                </Text>

                <Text
                  style={styles.textoValor}>
                  {livro.loja}
                </Text>
              </View>
            </View>
          </View>

        </ImageBackground>

        <View style={styles.space}/>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  card: {
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowColor: '#000000',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 1,
    flex: 1
  },

  container: {
    backgroundColor: '#fafafa',
    padding: 16,
    flex: 1,
  },

  infoContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    flexDirection: 'row',
    flex: 1,
  },

  capa: {
    flex: 1,
    height: 160,
    marginTop: 10,
    marginLeft: 15,
  },

  infoTextoContainer: {
    flex: 2,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
  },

  campoContainer: {
    flexDirection: 'column',
    marginTop: 5,
  },


  space: {
    flex: 1,
  },

  textoLabel: {
    fontSize: 11,
    color: '#4b4b4b',
  },

  textoValor: {
    fontSize: 16,
    color: '#373737',
  },

});