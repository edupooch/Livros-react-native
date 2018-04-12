import {AsyncStorage, Button, StyleSheet, TextInput, View} from "react-native";
import React from "react";

export default class LoginScreen extends React.Component {

    static navigationOptions = {
        title: 'Login',
    };

    constructor(props) {
        super(props);

        this.state = {
            login: '',
            senha: '',
        }
    }

    handleLoginChange = login => (
        this.setState({login: login})
    );

    handleSenhaChange = senha => (
        this.setState({senha: senha})
    );

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <TextInput
                        style={styles.input}
                        value={this.state.login}
                        placeholder="Login"
                        onChangeText={this.handleLoginChange}/>

                    <TextInput
                        style={styles.input}
                        value={this.state.senha}
                        placeholder="Senha"
                        secureTextEntry={true}
                        onChangeText={this.handleSenhaChange}/>

                    <View style={styles.container}>
                        <Button title="Sign in!" onPress={this._signInAsync}/>
                    </View>
                </View>
            </View>
        );
    }

    _signInAsync = async () => {
        await AsyncStorage.setItem('userToken', 'abc');
        this.props.navigation.navigate('App');
    };

}

const styles = StyleSheet.create({
    container: {
        padding: 16
    },
    textInput: {
        flex: 1,
    },
    cardCampos: {

        padding: 16
    },

    input: {
        padding: 5,
        borderBottomColor: '#e0e0e0',
    },

});