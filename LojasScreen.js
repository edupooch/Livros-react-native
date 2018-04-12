import {AsyncStorage, Button, StatusBar, StyleSheet, View} from "react-native";
import React from "react";


export default class LojasScreen extends React.Component {
    static navigationOptions = {
        title: 'Lojas'
    };

    render() {
        return (
            <View style={styles.container}>
                <FlatList>

                </FlatList>
            </View>
        );
    }

    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});