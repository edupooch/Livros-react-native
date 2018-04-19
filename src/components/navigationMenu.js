import React from "react";
import {MaterialIcons} from "@expo/vector-icons";
import {StyleSheet, View} from "react-native";
import Text from "react-native-elements/src/text/Text";

export default class MenuLivro extends React.Component {
  render() {
    return (

      <View style={styles.containerBarra}>
        <Text style={styles.textoTitulo}>Livros</Text>

        <MaterialIcons
          name={'camera-alt'}
          size={30}
          color={'#fff'}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerBarra: {
    flexDirection: 'row',
    flex: 1,
    alignItems:'center',
    justifyContent: 'space-between'
  },
  textoTitulo: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
