import React from "react";
import {Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {MaterialIcons} from '@expo/vector-icons'
import DateTimePicker from 'react-native-modal-datetime-picker';
import CameraExample from "../components/camera";
import Exponent, {Constants, ImagePicker, registerRootComponent} from 'expo';

export default class AdicionarLivroScreen extends React.Component {

  static navigationOptions = {
    title: 'Adicionar Livro',
    headerStyle: {
      backgroundColor: '#00897B',
      elevation: 0,
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  constructor(props) {
    super(props);
    // pega parâmetros passados pela outra tela
    const {params} = this.props.navigation.state;
    const inputLista = params ? params.titulo : null;
    const adicionarLivro = params ? params.onSubmit : null;

    // inicia o state
    this.state = {
      titulo: inputLista,
      autor: "",
      data: "",
      capa: "",
      pdf: "",
      loja: "",
      adicionarLivro: adicionarLivro,
      isDateTimePickerVisible: false,
      showCamera: false,
    };
  }

  salvarSala = () => {
    let livro = {
      titulo: this.state.titulo,
      autor: this.state.autor,
      data: this.state.data,
      capa: this.state.capa,
      pdf: this.state.pdf,
      loja: this.state.loja
    };
    let adicionarLivro = this.state.adicionarLivro;
    adicionarLivro(livro);

    this.props.navigation.goBack()
  };

  componentDidMount = () => {
    this._focusNextField('titulo')
  };

  _focusNextField(nextField) {
    this.refs[nextField].focus()
  };

  _showDateTimePicker = () => this.setState({isDatePickerVisible: true});

  _hideDateTimePicker = () => this.setState({isDatePickerVisible: false});

  _handleDatePicked = (date) => {
    let data = this.formatDate(date);
    this.setState({data: data});

    this._hideDateTimePicker();
  };

  _showCamera = () => this.setState({showCamera: true});

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(pickerResult.uri)
    this.setState({capa: pickerResult.uri})
  };

  formatDate = (date) => {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if (day < 10) {
      day = '0' + day;
    }
    if (month < 10) {
      month = '0' + month;
    }

    return day + '/' + month + '/' + year;
  };


  render() {
    if (this.state.showCamera) {
      return (<CameraExample/>)
    }

    return (
      <View
        style={styles.container}>

        <View style={styles.card}>
          <View
            style={styles.infoTextoContainer}>

            <Text style={[styles.textoLabel, styles.textoTopo]}>
              Insira as informações abaixo para adicionar um livro:
            </Text>

            <View style={styles.horizontal}>


              <View style={styles.containerTituloAutor}>
                <View
                  style={styles.campoContainer}>

                  <MaterialIcons
                    name={'book'}
                    size={30}
                    color={'#4b4b4b'}/>

                  <View
                    style={styles.textoContainer}>

                    <Text
                      style={styles.textoLabel}>
                      Título:
                    </Text>

                    <TextInput
                      ref='titulo'
                      style={styles.inputStyle}
                      value={this.state.titulo}
                      error={"Insira um valor para o título"}
                      onChangeText={(titulo) => this.setState({titulo})}
                      returnKeyType='next'
                      blurOnSubmit={false}
                      onSubmitEditing={() => this._focusNextField('autor')}/>
                  </View>
                </View>

                <View
                  style={styles.campoContainer}>
                  <MaterialIcons
                    name={'person'}
                    size={30}
                    color={'#4b4b4b'}/>

                  <View style={styles.textoContainer}>
                    <Text
                      style={styles.textoLabel}>
                      Autor:
                    </Text>

                    <TextInput
                      ref='autor'
                      style={styles.inputStyle}
                      value={this.state.autor}
                      onChangeText={(autor) => this.setState({autor})}
                      returnKeyType='next'
                      blurOnSubmit={false}
                      onSubmitEditing={() => this._focusNextField('loja')}
                    />
                  </View>
                </View>
              </View>

              <Image
                onPress={this._takePhoto}
                style={styles.capa}
                source={this.state.capa !== "" ? this.state.capa : require('../img/capa_add.jpg')}/>

            </View>

            <View style={[styles.horizontal, styles.containerDataLoja]}>
              <View
                style={[styles.campoContainer, styles.fill]}>

                <MaterialIcons
                  name={'store'}
                  size={30}
                  color={'#4b4b4b'}/>

                <View style={styles.textoContainer}>
                  <Text
                    style={styles.textoLabel}>
                    Loja:
                  </Text>

                  <TextInput
                    ref={'loja'}
                    style={styles.inputStyle}
                    value={this.state.loja}
                    onChangeText={(loja) => this.setState({loja})}
                    returnKeyType='next'
                    blurOnSubmit={false}
                    onSubmitEditing={() => this._focusNextField('data')}
                  />

                </View>
              </View>

              <TouchableOpacity style={[styles.campoContainer, styles.fill]} onPress={this._showDateTimePicker}>
                <MaterialIcons
                  name={'today'}
                  size={30}
                  color={'#4b4b4b'}/>

                <View style={styles.textoContainer}>
                  <Text
                    style={styles.textoLabel}>
                    Lançamento:
                  </Text>

                  <TextInput
                    ref={'data'}
                    style={styles.inputStyle}
                    value={this.state.data}
                    onChangeText={(data) => this.setState({data})}
                    returnKeyType={'next'}
                    blurOnSubmit={false}
                    editable={false}
                    onFocus={this._showDateTimePicker}
                    pointerEvents="none"/>
                </View>
              </TouchableOpacity>

              <DateTimePicker
                isVisible={this.state.isDatePickerVisible}
                onConfirm={this._handleDatePicked}
                onCancel={this._hideDateTimePicker}
                titleIOS={"Data de lançamento"}/>


            </View>

          </View>

          <View
            style={styles.botaoContainer}>

            <Button
              onPress={this.salvarSala}
              color={"#00897B"}
              title={"Adicionar"}/>

          </View>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00897B',
    padding: 10,
    flex: 1,
  },

  textoTopo: {
    textAlign: 'center',
    padding: 10,
  },

  card: {
    borderRadius: 3,
    backgroundColor: '#fff',
    margin: 5,
    shadowColor: '#000000',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 1,
  },
  containerDataLoja: {
    marginTop: 0,
  },
  containerTituloAutor: {
    flex: 3,
  },

  horizontal: {
    flexDirection: 'row'
  },


  capa: {
    flex: 1,
    height: 100,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 10,
  },

  textoLabel: {
    fontSize: 12,
    paddingLeft: 2,
    color: '#4b4b4b',
  },

  textoContainer: {
    flex: 1,
    marginLeft: 10,
  },

  infoTextoContainer: {
    paddingLeft: 10,
    paddingEnd: 10,
  },

  campoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  fill: {
    flex: 1,
  },


  inputStyle: {
    paddingBottom: 6,
    paddingLeft: 2,
    fontSize: 18,

  },

  botaoContainer: {
    padding: 20,
  },

});