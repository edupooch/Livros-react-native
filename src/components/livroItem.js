import React from 'react'
import {Text, StyleSheet, View, TouchableOpacity, Image} from 'react-native';


const LivroItem = props => {
  let capaUri = props.item.capa;
  return (
    <View
      style={styles.card}>
      <Image
        style={styles.capaContainer}
        source={!props.item.capa ? require('../img/default.png') : {uri: capaUri}}/>

      <View
        style={styles.containerInfoCards}>

        <View
          style={styles.containerTitulo}>
          <Text
            style={styles.textoTituloAndroid}>
            {props.item.titulo}
          </Text>

          <Text
            style={styles.textoAutor}>
            {props.item.autor}
          </Text>

        </View>

        {/*/!*space*!/*/}
        <View style={{flex: 1}}/>

        <View
          style={styles.botaoContainer}>

          <TouchableOpacity
            onPress={(props.cliqueLivro)}>

            <Text
              style={styles.textoBotao}>
              VER MAIS
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    </View>
  )
};


const styles = StyleSheet.create({
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
    height: 90
  },

  capaContainer: {
    height: 90,
    overflow:'hidden',
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
    flex: 1
  },

  containerInfoCards: {
    flexDirection: 'column',
    flex: 5,
  },

  containerTitulo: {
    flexDirection: 'column',
    marginTop: 5,
    marginLeft: 10,
  },

  textoTituloAndroid: {
    fontSize: 17,
    color: '#4b4b4b',
  },
  textoAutor: {
    fontSize: 12,
    color: '#696969',
  },

  botaoContainer: {
    flex: 1,
    paddingBottom: 10,
    paddingRight: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },

  textoBotao: {
    color: '#00897B'
  }
});

export default LivroItem;