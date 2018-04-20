import React from "react";
import {
  Button,
  Image,
  ImageBackground,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import MenuLivro from "../components/navigationMenu";

export default class LivroScreen extends React.Component {
  static navigationOptions = {
    title: 'Livro',
    headerTitle: <MenuLivro
      deletaItem= {() => {
        console.log('aaa');
        const {params} = this.props.navigation.state;
        const deletaItem = params ? params.deletaItem : null;
        deletaItem()
      }
      }/>,
    headerStyle: {
      backgroundColor: '#00897B',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  render() {
    const {params} = this.props.navigation.state;
    const livro = params ? params.livro : null;
    const uriCapa = livro.capa;
    return (
      <View
        style={styles.container}>

        <View style={styles.card}>

          <ImageBackground
            source={livro.capa !== "" ? {uri: uriCapa} : null}
            blurRadius={1.5}
            style={styles.barraCapa}>

            <View style={styles.capaContainer}>
              <Image
                source={livro.capa !== "" ? {uri: uriCapa} : null}
                style={styles.capa}/>
            </View>

          </ImageBackground>

          <View style={styles.infoContainer}>

            <ScrollView
              style={styles.infoTextoContainer}>

              <View
                style={styles.campoContainer}>

                <MaterialIcons
                  style={styles.icone}
                  name={'book'}
                  size={22}
                  color={'#5f5f5f'}/>

                <View>
                  <Text
                    style={styles.textoLabel}>
                    Título:
                  </Text>

                  <Text
                    style={styles.textoValor}>
                    {livro.titulo}
                  </Text>

                </View>
              </View>

              <View
                style={styles.campoContainer}>

                <MaterialIcons
                  style={styles.icone}
                  name={'person'}
                  size={25}
                  color={'#5f5f5f'}/>

                <View>
                  <Text
                    style={styles.textoLabel}>
                    Autor:
                  </Text>

                  <Text
                    style={styles.textoValor}>
                    {livro.autor}
                  </Text>
                </View>
              </View>

              <View
                style={styles.campoContainer}>

                <MaterialIcons
                  style={styles.icone}
                  name={'today'}
                  size={22}
                  color={'#5f5f5f'}/>
                <View>
                  <Text
                    style={styles.textoLabel}>
                    Lançamento:
                  </Text>

                  <Text
                    style={styles.textoValor}>
                    {livro.data}
                  </Text>
                </View>
              </View>

              <View
                style={styles.campoContainer}>

                <MaterialIcons
                  style={styles.icone}
                  name={'store'}
                  size={22}
                  color={'#5f5f5f'}/>

                <View>

                  <Text
                    style={styles.textoLabel}>
                    Loja:
                  </Text>

                  <Text
                    style={styles.textoValor}>
                    {livro.loja}
                  </Text>

                </View>
              </View>

              {livro.pdf !== "" &&
              <View style={styles.botaoContainer}>
                <Button
                  title={"Ver PDF"}
                  color={"#00897B"}
                  onPress={() => Linking.openURL(livro.pdf)}/>
              </View>
              }

            </ScrollView>
          </View>
        </View>
      </View>
    )
  }

}

export const deletaItem = () => {
  console.log('aaa');
  const {params} = this.props.navigation.state;
  const deletaItem = params ? params.deletaItem : null;
  deletaItem()
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowColor: '#000000',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 1,

  },

  container: {
    backgroundColor: '#fafafa',
    padding: 16,
    flex: 1,
  },

  barraCapa: {
    flex: 4,
  },

  infoContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    flex: 6,
  },


  capaContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    shadowColor: '#000000',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 1,
  },

  capa: {
    flex: 1,
    width: 130,
    alignSelf: 'center'
  },

  infoTextoContainer: {
    flex: 2,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
  },


  campoContainer: {
    marginTop: 10,
    alignItems: 'center',
    flexDirection: 'row'
  },

  icone: {
    marginRight: 10
  },

  textoLabel: {
    fontSize: 12,
    color: '#5f5f5f',
  },

  textoValor: {
    fontSize: 17,
    color: '#373737',
  },

  botaoContainer: {
    marginTop: 20,
    marginLeft: 40,
    marginRight: 40,
  }

});