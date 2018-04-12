import React from "react";
import {StackNavigator} from 'react-navigation';
import LojaListaScreen from "./LojaListaScreen";

export default StackNavigator({

        ListaLojas: {
            screen: LojaListaScreen,
        },
    },

    {
        initialRouteName: 'ListaLojas',
    },
);