import React from "react";
import {StackNavigator} from 'react-navigation';
import LivroListaScreen from "../screens/LivroListaScreen";
import LivroScreen from "../screens/LivroScreen";
import AdicionarLivroScreen from "../screens/AdicionarLivroScreen";

export default StackNavigator({
    Home: {
      screen: LivroListaScreen,
    },

    DetalhesLivro: {
      screen: LivroScreen,
    },

    AdicionarLivro: {
      screen: AdicionarLivroScreen,
    },

  },

  {
    initialRouteName: 'Home',
  },
);