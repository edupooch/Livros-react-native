import React from 'react'
import {Text, View, StyleSheet} from 'react-native';

const ItemLivro = props => (
    <View style={styles.row}>
        <Text>{props.titulo}</Text>
        <Text>{props.autor}</Text>
    </View>
);

const styles = StyleSheet.create({
    row: {
        padding: 10,
    }
});

export default ItemLivro;