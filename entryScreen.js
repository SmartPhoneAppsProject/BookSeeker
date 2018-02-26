import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  Button,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  DatePickerIOS
} from 'react-native';

export default class EntryScreen extends Component {
  static navigationOptions = {
    title: 'ScanScreen',
  };

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      chosenDate: new Date(),
      tags: '',
      photo: null,
      showDatePicker: false,
    };

    this.setDate = this.setDate.bind(this);
    this.setDatePicker = this.setDatePicker.bind(this);
  }

  //コンストラクタでthisをバインドすることで呼び出し場所に左右されない
  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }

  setDatePicker() {
    this.setState({ showDatePicker: !this.state.showDatePicker });
  }

  goScanScreen() {
    this.props.navigation.navigate('Scan', {
      title: this.state.title,
      tags: this.state.tags,
      photo: this.state.photo
    });
  }

  returnDataFromChild(data) {
    this.setState({ photo: data });
  }

  renderPhotoContainer() {
    const photo = this.state.photo
      ? <Image resizeMode='contain'
        style={styles.photo}
        source={{ uri: this.state.photo.uri }} />
      : <View />;
    return (
      <View style={styles.photoContainer} >
        {photo}
        <Button style={styles.takePhoto}
          onPress={() => this.props.navigation.navigate('Camera', { returnDataFromChild: this.returnDataFromChild.bind(this) })}
          title='Camera' />
      </View>
    );
  }

  renderFormContainer() {
    const datePicker = this.renderDatePicker();
    return (
      <View style={styles.formContainer}>
        <Text style={styles.tag}>Title</Text>
        <TextInput style={styles.input}
          onChangeText={(text) => this.setState({ title: text })}
          value={this.state.title}
          onSubmitEditing={() => this.tagInput.focus()}
          returnKeyType='next'
          placeholder='title'
          maxLenghth={100} />

        <Text style={styles.tag}>Tags</Text>
        <TextInput style={styles.input}
          onChangeText={(text) => this.setState({ tags: text })}
          value={this.state.tags}
          returnKeyType='go'
          ref={(input) => this.tagInput = input}
          placeholder='tags'
          maxLenghth={100} />

        <View style={styles.datePickerContainer}>
          <Text style={styles.tag}>Published_at</Text>
          <TouchableOpacity style={styles.datePicker}
            onPress={this.setDatePicker}>
            <Text>{`${this.state.chosenDate}`}</Text>
          </TouchableOpacity>
          {datePicker}
        </View>

        <TouchableOpacity style={styles.buttonContainer}
          onPress={this.goScanScreen.bind(this)}>
          <Text style={styles.buttonText}>submit</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderDatePicker() {
    const showDatePicker = this.state.showDatePicker
      ? <DatePickerIOS
        date={this.state.chosenDate}
        onDateChange={this.setDate}
        mode='date'
        locale='ja' />
      : <View />;

    return showDatePicker;
  }

  render() {
    const { navigate } = this.props.navigation;
    const photoContainer = this.renderPhotoContainer();
    const formContainer = this.renderFormContainer();
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        {photoContainer}
        {formContainer}
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
  },
  photo: {
    width: width / 3,
    height: (4 / 3 * width) / 3,
  },
  takePhoto: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    flex: 2,
    justifyContent: 'center',
    padding: 20,
  },
  tag: {
    alignSelf: 'stretch',
    height: 40,
    marginBottom: 10,
    padding: 10,
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 10,
    padding: 10,
  },
  datePickerContainer: {
    flex: 1,
  },
  datePicker: {
    flex: 1,
  },
  buttonContainer: {
    backgroundColor: '#2980b6',
    paddingVertical: 15,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  }
});