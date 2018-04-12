import React from "react";
import {StackNavigator} from 'react-navigation';
import LivroListaScreen from "./LivroListaScreen";

export default StackNavigator({
        Home: {
            screen: LivroListaScreen,
        },
    },

    {
        initialRouteName: 'Home',
    },


);