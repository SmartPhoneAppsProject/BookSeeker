import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableHighlight,
  KeyboardAvoidingView,
} from 'react-native';

import {
  Input,
  Button,
} from 'react-native-elements';

import DateTimePicker from 'react-native-modal-datetime-picker';
import { MaterialIcons, FontAwesome, Entypo } from '@expo/vector-icons';

import { pickPhoto, takePhoto } from '../ImagePicker';

export default class EntryScreen extends Component {
  static navigationOptions = {
    title: '本の登録',
  };

  constructor(props) {
    super(props);

    const date = new Date();
    const formatDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

    this.state = {
      title: '',
      chosenDate: new Date(),
      publishedAt: formatDate,
      photo: null,
      isDateTimePickerVisible: false,
      validation: false,
      errorMessage: ' ',
    };

    this.showDateTimePicker = this.showDateTimePicker.bind(this);
    this.hideDateTimePicker = this.hideDateTimePicker.bind(this);
    this.handleDatePicked = this.handleDatePicked.bind(this);
    this.goScanScreen = this.goScanScreen.bind(this);
  }

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = (date) => {
    const formatDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    this.setState({
      chosenDate: date,
      publishedAt: formatDate,
    });
    this.hideDateTimePicker();
  };

  async _takePhoto() {
    const photo = await takePhoto();
    this.setState({ photo: photo });
  }

  async _pickPhoto() {
    const photo = await pickPhoto();
    this.setState({ photo: photo });
  }

  goScanScreen = () => {
    this.props.navigation.navigate('Scan', {
      title: this.state.title,
      photo: this.state.photo,
      publishedAt: this.state.publishedAt,
    });
  };

  renderPhotoContainer = () => {
    const photo = this.state.photo
      ? <Image style={styles.photo}
        resizeMode='contain'
        source={{ uri: this.state.photo.uri }} />
      : <View />;

    return (
      <View style={styles.photoContainer} >
        {photo}
        <TouchableHighlight style={styles.photoButton}
          onPress={() => this._takePhoto()}
          underlayColor='#dcdcdc' >
          <MaterialIcons name='photo-camera' size={40} color='#a9a9a9' />
        </TouchableHighlight>
        <TouchableHighlight style={styles.photoButton}
          onPress={() => this._pickPhoto()}
          underlayColor='#dcdcdc' >
          <FontAwesome name='photo' size={40} color='#a9a9a9' />
        </TouchableHighlight>
      </View>
    );
  };

  renderTitleContainer = () => {
    return (
      <View style={styles.childContainer}>
        <View style={styles.inputContainer}>
          <Input
            containerStyle={styles.input}
            onChangeText={(text) => this._changeText(text)}
            value={this.state.title}
            returnKeyType='done'
            placeholder='タイトル'
            shake={this.state.validation}
            displayError={true}
            errorStyle={{ color: '#cd5c5c' }}
            errorMessage={this.state.errorMessage}
            maxLength={100} />
        </View>
      </View>
    );
  };

  _changeText = (text) => {
    console.log(text);
    this.setState({
      title: text,
      validation: false,
      errorMessage: ' ',
    });

    if (!text) {
      this.setState({
        validation: true,
        errorMessage: '無効な値です。'
      });
    }
  };

  renderDateContainer() {
    return (
      <View style={styles.childContainer}>
        <Text style={styles.tag}>発行日を選択</Text>
        <Button
          iconRight
          icon={<Entypo name='triangle-down' size={20} color='#A4A4A4'/>}
          title={this.state.publishedAt}
          titleStyle={{color: '#A4A4A4', fontWeight: "700"}}
          buttonStyle={styles.dateButton}
          iconContainerStyle={{marginRight: 10, marginLeft: 110}}
          onPress={this.showDateTimePicker}/>
        <View style={styles.showDateTimePicker}>
          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this.handleDatePicked}
            onCancel={this.hideDateTimePicker}
            date={this.state.chosenDate}
            locale={'ja'}
            maximumDate={new Date()}
            titleIOS={'発行日を選択する'}
            cancelTextIOS={'キャンセル'}
            confirmTextIOS={'決定'} />
        </View>
      </View>
    );
  }

  renderButtonContainer() {
    return (
      <View style={styles.childContainer}>
        <Button
          icon={<FontAwesome name='barcode' size={22} color='white'/>}
          title='バーコード読み取り'
          onPress={this.goScanScreen}
          titleStyle={styles.buttonText}
          buttonStyle={styles.buttonContainer}
          iconContainerStyle={{marginRight: 10}}/>
      </View>
    );
  }

  render() {
    const { navigate } = this.props.navigation;
    const photoContainer = this.renderPhotoContainer();
    const titleContainer = this.renderTitleContainer();
    const dateContainer = this.renderDateContainer();
    const buttonContainer = this.renderButtonContainer();

    return (
      <KeyboardAvoidingView behavior='padding'
        style={styles.container}>
        {photoContainer}
        {titleContainer}
        {dateContainer}
        {buttonContainer}
      </KeyboardAvoidingView>
    );
  }
}

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  photoContainer: {
    flex: 1,
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photo: {
    width: width / 6,
    height: (4 * width / 3) / 6,
  },
  photoButton: {
    padding: 5,
    margin: 5,
  },
  childContainer: {
    flex: 1,
    padding: 15,
  },
  tag: {
    alignSelf: 'stretch',
    paddingLeft: 20,
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 10,
    borderBottomWidth: 2,
    borderColor: '#A4A4A4'
  },
  dateButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    margin: 10,
    width: width - 60,
    paddingLeft: 18,
    paddingRight: 18,
    paddingTop: 8,
    paddingBottom: 8,
    borderWidth: 2,
    borderColor: '#A4A4A4',
    borderRadius: 7,

  },
  buttonContainer: {
    backgroundColor: '#2980b6',
    paddingVertical: 20,
    paddingRight: 10,
    paddingLeft: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  }
});
