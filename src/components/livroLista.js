import React from "react";
import {FlatList} from "react-native";
import LivroItem from "./livroItem";

const renderItem = obj => <LivroItem {...(obj.item)}/>;

const LivroLista = props => {
  return (
    <FlatList
      renderItem={renderItem}
      data={props.livros}
      keyExtractor={(item, index) => index.toString()}
    />
  )
};

export default LivroLista;