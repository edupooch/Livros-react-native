import React from "react";
import {Button, Image, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {MaterialIcons, FontAwesome} from '@expo/vector-icons'
import DateTimePicker from 'react-native-modal-datetime-picker';
import {ImagePicker, DocumentPicker, Permissions} from 'expo';
import Modal from 'react-native-modal';

export default class FormularioLivroScreen extends React.Component {

  static navigationOptions = {
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
    const inputLista = params ? params.titulo : "";
    const adicionar = params ? params.adicionarNovo : null;
    const editar = params ? params.editarLivro : null;
    const atualizaView = params ? params.atualizaView : null;
    const livro = params ? params.livro : null;
    const idLivro = params ? params.index : null;


    // inicia o state
    if (livro === undefined) {
      // entrou na tela para adicionar livro
      this.state = {
        adicionarLivro: adicionar,
        titulo: inputLista,
        autor: "",
        dtLancamento: "",
        capa: "",
        pdf: "",
        loja: "",
        isDateTimePickerVisible: false,
        modalVisible: false,
      };
    } else {
      // entrou na tela para editar o livro
      //Linha para declarar loja vazia, tava dando problema pq o app ionic nao tem loja
      if (!livro.loja) livro.loja = "";

      this.state = {
        editarLivro: editar,
        atualizaView: atualizaView,
        index: idLivro,
        titulo: livro.titulo,
        autor: livro.autor,
        dtLancamento: livro.dtLancamento,
        capa: livro.capa,
        pdf: livro.pdf,
        loja: livro.loja,
        isDateTimePickerVisible: false,
        modalVisible: false,
      };
    }

  }

  salvarSala = () => {
    let livro = {
      titulo: this.state.titulo,
      autor: this.state.autor,
      dtLancamento: this.state.dtLancamento,
      capa: this.state.capa,
      pdf: this.state.pdf,
      loja: this.state.loja
    };

    if (!this.state.adicionarLivro) {
      let editarLivro = this.state.editarLivro;
      editarLivro(livro, this.state.index);

      let atualizaView = this.state.atualizaView;
      atualizaView(livro);
      this.props.navigation.goBack();
    } else {
      let adicionarLivro = this.state.adicionarLivro;
      adicionarLivro(livro);
      this.props.navigation.goBack();
    }
  };

  componentDidMount = () => {
    this._focusNextField('titulo')
  };

  _focusNextField(nextField) {
    this.refs[nextField].focus()
  };

  _showDateTimePicker = () => {
    Keyboard.dismiss();
    this.setState({isDatePickerVisible: true})
  };

  _hideDateTimePicker = () => this.setState({isDatePickerVisible: false});

  _handleDatePicked = (date) => {
    let dtLancamento = this.formatDate(date);
    this.setState({dtLancamento: dtLancamento});

    this._hideDateTimePicker();
  };

  _showCamera = () => this.setState({showCamera: true});

  _takePhoto = async () => {
    this.setModalVisible(false);

    const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
    const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    
    let pickerResult = await ImagePicker.launchCameraAsync({
      // allowsEditing: true,
      // aspect: [4, 3],
      // base64: true,
      quality: 0.5, //qualidade da compressão
    });

    if (pickerResult.uri !== undefined)
      this.setState({capa: pickerResult.uri});
  };

  _pickImage = async () => {
    this.setModalVisible(false);
    
    const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'Images',
      quality: 0.7 //qualidade da compressão
    });
    if (pickerResult.uri !== undefined)
      this.setState({capa: pickerResult.uri});
  };

  _pickDocument = async () => {
    let pickerResult = await DocumentPicker.getDocumentAsync({type: 'application/pdf'});
    if (pickerResult.uri !== undefined)
      this.setState({pdf: pickerResult.uri});
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

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    let imageUri = this.state.capa;
    return (

      <View
        style={styles.container}>

        <Modal
          onRequestClose={() => this.setModalVisible(false)}
          isVisible={this.state.modalVisible}>

          <View style={styles.modalContent}>

            <Text>Selecionar imagem da:</Text>

            <View
              style={styles.opcoesImagem}>

              <TouchableOpacity
                style={styles.capaContainer}
                onPress={this._takePhoto}>

                <View>
                  <MaterialIcons
                    name={'camera-alt'}
                    size={50}
                    color={'#4b4b4b'}/>

                  <Text
                    style={styles.textoBotao}>
                    Câmera
                  </Text>
                </View>

              </TouchableOpacity>

              <TouchableOpacity
                style={styles.capaContainer}
                onPress={this._pickImage}>

                <View>
                  <MaterialIcons
                    name={'image'}
                    size={50}
                    color={'#4b4b4b'}/>

                  <Text
                    style={styles.textoBotao}>
                    Galeria
                  </Text>

                </View>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.btCancelar}
              onPress={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}>

              <Text>CANCELA</Text>

            </TouchableOpacity>
          </View>
        </Modal>

        <View style={styles.card}>

          <View
            style={[styles.infoTextoContainer, styles.horizontal]}>

            <View style={styles.containerCampos}>

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
                    onSubmitEditing={() => this._focusNextField('loja')}/>

                </View>
              </View>

              <View
                style={styles.campoContainer}>

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
                    onSubmitEditing={() => this._focusNextField('dtLancamento')}
                  />

                </View>
              </View>

              <TouchableOpacity style={styles.campoContainer} onPress={this._showDateTimePicker}>
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
                    ref={'dtLancamento'}
                    style={styles.inputStyle}
                    value={this.state.dtLancamento}
                    onChangeText={(dtLancamento) => this.setState({dtLancamento})}
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

            <View style={styles.containerBotoesUpload}>

              <TouchableOpacity
                style={styles.capaContainer}
                onPress={() => this.setModalVisible(!this.state.modalVisible)}>

                {this.state.capa ?
                  <Image
                    style={styles.capa}
                    resizeMode="contain"
                    source={this.state.capa !== "" ? {uri: imageUri} : null}/>
                  :
                  <View>
                    <FontAwesome
                      name={'book'}
                      size={30}
                      color={'#4b4b4b'}/>

                    <Text
                      style={styles.textoImagem}>
                      CAPA
                    </Text>
                  </View>
                }

              </TouchableOpacity>

              <TouchableOpacity
                style={styles.pdfContainer}
                onPress={this._pickDocument}>

                <View>
                  <MaterialIcons
                    name={this.state.pdf === "" ? 'insert-drive-file' : 'check-circle'}
                    size={30}
                    color={this.state.pdf === "" ? '#4b4b4b' : '#00897B'}/>


                  <Text
                    style={this.state.pdf === "" ? styles.textoImagem : styles.textoPdfEnviado}>
                    PDF
                  </Text>

                </View>
              </TouchableOpacity>
            </View>

          </View>
          <View
            style={styles.botaoContainer}>

            <Button
              onPress={this.salvarSala}
              color={"#00897B"}
              title={this.state.adicionarLivro ? "Adicionar" : "Editar"}/>

          </View>
        </View>
      </View>

    );
  }

}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00897B',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingTop: 5,
    flex: 1,
  },

  textoTopo: {
    textAlign: 'center',
    padding: 10,
  },

  card: {
    borderRadius: 3,
    backgroundColor: '#fff',
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    shadowColor: '#000000',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 1,
    paddingTop: 10,
  },

  containerDataLoja: {
    marginTop: 0,
    flex: 1,
  },

  containerCampos: {
    flex: 3,
  },

  horizontal: {
    flexDirection: 'row'
  },

  containerBotoesUpload: {
    flex: 1,
  },

  capaContainer: {
    height: 100,
    flex: 4,
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 5,
    marginRight: 10,
    alignItems: 'center',
    // alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#e7e8eb',
    borderRadius: 5,
  },

  pdfContainer: {
    flex: 2,
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 5,
    marginRight: 10,
    alignItems: 'center',
    // alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#e7e8eb',
    borderRadius: 5,
    marginBottom: 15,
  },


  capa: {
    flex: 1,
    height: 200,
    borderRadius: 5,
  },

  textoLabel: {
    fontSize: 12,
    paddingLeft: 2,
    color: '#4b4b4b',
  },

  textoImagem: {
    fontSize: 10,
    color: '#696969',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  textoPdfEnviado: {
    fontSize: 10,
    color: '#00897B',
    fontWeight: 'bold',
    textAlign: 'center',
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

  dialogFoto: {
    margin: 50,
  },

  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },

  opcoesImagem: {
    flexDirection: 'row',
    margin: 15,
  },


  btCancelar: {
    padding: 10,
    justifyContent: 'center'
  },

  textoBotao: {
    fontSize: 14,
    textAlign: 'center',
    color: '#696969',
  },

});