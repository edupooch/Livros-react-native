import {AsyncStorage, Button, StyleSheet, View} from "react-native";
import React from "react";
import {livros} from "./livros"
import ListaLivros from "./listaLivros"

export default class LivrosScreen extends React.Component {
    static navigationOptions = {
        title: 'Livros',
        paddingTop: '100'
    };

    constructor(props) {
        super(props);
        this.state = {
            livros: livros,
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ListaLivros livros={this.state.livros}/>
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
        flex: 1,
    },
});