import React from "react";
import {StackNavigator} from 'react-navigation';
import LivroListaScreen from "../screens/LivroListaScreen";
import LivroScreen from "../screens/LivroScreen";
import FormularioLivroScreen from "../screens/FormularioLivroScreen";

export default StackNavigator({

    Home: {
      screen: LivroListaScreen,
    },

    DetalhesLivro: {
      screen: LivroScreen,
    },

    AdicionarLivro: {
      screen: FormularioLivroScreen,
      navigationOptions: {title: "Adicionar Livro"}
    },

    EditarLivro: {
      screen: FormularioLivroScreen,
      navigationOptions: {title: "Editar Livro"}
    },

  },

  {
    initialRouteName: 'Home',
  },
);