import React from "react";
import {FlatList} from "react-native";
import ItemLivro from "./itemLivro";

const renderItem = obj => <ItemLivro {...(obj.item)}/>;

const ListaLivros = props => {
    return (
        <FlatList
            renderItem={renderItem}
            data={props.livros}
        />
    )
};

export default ListaLivros;