import React from 'react'
import {Text, StyleSheet, View, TouchableOpacity, Image} from 'react-native';

const ItemLivro = props => {

    return (
        <View style={styles.card}>

            <Image
                style={styles.capa}
                source={props.capa}
            />


            <View style={styles.containerInfoCards}>
                <View style={styles.containerTitulo}>
                    <Text style={styles.textoTitulo}>
                        {props.titulo}
                    </Text>

                    <Text style={styles.textoAutor}>
                        {props.autor}
                    </Text>

                </View>

                {/*/!*space*!/*/}
                <View style={{flex: 1}}/>

                <View style={styles.botaoContainer}>
                    <TouchableOpacity>
                        <Text style={styles.textoBotao}>VER MAIS</Text>
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
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.9,
        shadowRadius: 8,
        elevation: 1,
        height: 90

    },

    capa: {
        height: 90,
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

    textoTitulo: {
        fontSize: 17,
        color: '#4b4b4b',
        fontFamily:'sans-serif-light'
    },
    textoAutor: {
        fontSize: 12,
        color: '#696969',
        fontFamily:'sans-serif-light'
    },

    botaoContainer: {
        flex: 1,
        paddingBottom: 10,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },

    textoBotao: {
        color: '#2196F3'
    }
});

export default ItemLivro;