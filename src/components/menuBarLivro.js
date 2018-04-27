import React from "react";
import {MaterialIcons} from "@expo/vector-icons";
import {StyleSheet, Platform, Text, TouchableOpacity, View} from "react-native";

const MenuBarLivro = props => {

  return (
    <View style={styles.containerBarra}>
      <Text style={Platform.OS === 'ios' ? styles.textoTituloIos : styles.textoTituloAndroid}>Livro</Text>

      <View>
        <TouchableOpacity
          onPress={props.deletaItem}
          style={styles.icone}>

          <MaterialIcons
            name={'delete'}
            size={25}
            color={'#fff'}/>

        </TouchableOpacity>
      </View>


      <View>
        <TouchableOpacity
          onPress={props.editaItem}
          style={styles.icone}>

          <MaterialIcons
            name={'edit'}
            size={25}
            color={'#fff'}/>

        </TouchableOpacity>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({

  containerBarra: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  textoTituloIos: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingLeft: 30,
    flex: 1,
  },

  textoTituloAndroid: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 20,
  },

  icone: {
    paddingRight: 10,
    paddingLeft: 10,
    justifyContent: 'center',
  },

});

export default MenuBarLivro