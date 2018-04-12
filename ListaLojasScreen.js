import React from "react";
import {AsyncStorage, StyleSheet, View} from "react-native";
import {livros} from "./livros"
import ListaLivros from "./listaLivros"

export default class ListaLojasScreen extends React.Component {
    static navigationOptions = {
        title: 'Lojas',
        headerStyle: {
            backgroundColor: '#2196F3',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
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
        backgroundColor: '#fafafa',
        padding: 10,
        flex: 1,
    },
});