import React from "react";
import {MaterialIcons} from "@expo/vector-icons";
import {StyleSheet, TouchableOpacity, View} from "react-native";

const MenuItem = props => {

  return (
    <View style={styles.containerBarra}>
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
          onPress={props.deletaItem}
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
    paddingRight: 10
  },

  textoTitulo: {
    color: '#fff',
    fontWeight: 'bold',
  },

  icone: {
    flex: 1,
    paddingRight: 10,
    paddingLeft: 10,
    justifyContent: 'center',
  },

});

export default MenuItem