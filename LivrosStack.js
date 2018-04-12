import React from "react";
import {StackNavigator} from 'react-navigation';
import ListaLivrosScreen from "./ListaLivrosScreen";

export default StackNavigator({
        Home: {
            screen: ListaLivrosScreen,
        },
    },

    {
        initialRouteName: 'Home',
    },


);