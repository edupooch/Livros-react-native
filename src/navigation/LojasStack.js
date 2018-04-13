import React from "react";
import {StackNavigator} from 'react-navigation';
import LojaListaScreen from "../screens/LojaListaScreen";

export default StackNavigator({

    ListaLojas: {
      screen: LojaListaScreen,
    },
  },

  {
    initialRouteName: 'ListaLojas',
  },
);