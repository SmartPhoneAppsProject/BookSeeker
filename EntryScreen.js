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
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';

export default class EntryScreen extends Component {
  static navigationOptions = {
    title: 'ScanScreen',
  };

  constructor(props) {
    super(props);

    const date = new Date();
    const formatDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

    this.state = {
      title: '',
      chosenDate: new Date(),
      publishedAt: formatDate,
      tags: '',
      photo: null,
      isDateTimePickerVisible: false,
    };

    this.showDateTimePicker = this.showDateTimePicker.bind(this);
    this.hideDateTimePicker = this.hideDateTimePicker.bind(this);
    this.handleDatePicked = this.handleDatePicked.bind(this);
    this.goScanScreen = this.goScanScreen.bind(this);
    this.returnDataFromChild = this.returnDataFromChild.bind(this)
  }

  showDateTimePicker() {
    this.setState({ isDateTimePickerVisible: true });
  }

  hideDateTimePicker() {
    this.setState({ isDateTimePickerVisible: false });
  }

  handleDatePicked(date) {
    const formatDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    this.setState({
      chosenDate: date,
      publishedAt: formatDate,
    });
    this.hideDateTimePicker();
  }

  returnDataFromChild(data) {
    this.setState({ photo: data });
  }

  goScanScreen() {
    this.props.navigation.navigate('Scan', {
      title: this.state.title,
      tags: this.state.tags,
      photo: this.state.photo,
      publishedAt: this.state.publishedAt,
    });
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
        <Button style={styles.takePhotoButton}
          onPress={() => this.props.navigation.navigate('Camera', { returnDataFromChild: this.returnDataFromChild })}
          title='Camera' />
      </View>
    );
  }

  renderTitleContainer() {
    return (
      <View style={styles.childContainer}>
        <Text style={styles.tag}>タイトル</Text>
        <TextInput style={styles.input}
          onChangeText={(text) => this.setState({ title: text })}
          value={this.state.title}
          onSubmitEditing={() => this.tagInput.focus()}
          returnKeyType='next'
          placeholder='title'
          maxLenghth={100} />
      </View>
    );
  }

  renderTagsContainer() {
    return (
      <View style={styles.childContainer}>
        <Text style={styles.tag}>タグ</Text>
        <TextInput style={styles.input}
          onChangeText={(text) => this.setState({ tags: text })}
          value={this.state.tags}
          returnKeyType='go'
          ref={(input) => this.tagInput = input}
          placeholder='tags'
          maxLenghth={100} />
      </View >
    );
  }

  renderDateContainer() {
    return (
      <View style={styles.childContainer}>
        <Text style={styles.tag}>発行日</Text>
        <TouchableOpacity style={styles.input}
          onPress={this.showDateTimePicker}>
          <Text>{this.state.publishedAt}</Text>
        </TouchableOpacity>
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
            confirmTextIOS={'決定'}
          />
        </View>
      </View>
    );
  }

  renderButtonContainer() {
    return (
      <View style={styles.childContainer}>
        <TouchableOpacity style={styles.buttonContainer}
          onPress={this.goScanScreen}>
          <Text style={styles.buttonText}>submit</Text>
        </TouchableOpacity>
      </View >
    );
  }

  render() {
    const { navigate } = this.props.navigation;
    const photoContainer = this.renderPhotoContainer();
    const titleContainer = this.renderTitleContainer();
    const tagsContainer = this.renderTagsContainer();
    const dateContainer = this.renderDateContainer();
    const buttonContainer = this.renderButtonContainer();

    return (
      <KeyboardAvoidingView behavior='padding'
        style={styles.container}>
        {photoContainer}
        {titleContainer}
        {tagsContainer}
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
  },
  photo: {
    width: width / 6,
    height: (4 / 3 * width) / 6,
  },
  takePhotoButton: {
    flex: 1,
  },
  childContainer: {
    flex: 1,
    padding: 20,
  },
  tag: {
    alignSelf: 'stretch',
    marginBottom: 10,
    padding: 10,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 10,
    padding: 10,
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