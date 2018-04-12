import React from "react";
import {StackNavigator} from 'react-navigation';
import ListaLojasScreen from "./ListaLojasScreen";

export default StackNavigator({

        ListaLojas: {
            screen: ListaLojasScreen,
        },
    },

    {
        initialRouteName: 'ListaLojas',
    },
);