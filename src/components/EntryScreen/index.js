import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  KeyboardAvoidingView,
} from 'react-native';
import {
  Input,
  Button,
} from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {
  MaterialIcons,
  FontAwesome,
  Entypo,
} from '@expo/vector-icons';

import {
  pickPhoto,
  takePhoto,
} from './ImagePicker';
import { index as styles } from './Styles';

export default class EntryScreen extends Component {
  onChangeTitleText = (text) => {
    this.props.changeTitle(text);

    if (!text) {
      this.props.validateTitle('タイトルを入力してください');
    }
  };

  showDateTimePicker = () => {
    this.props.toggleDateTimePicker(true);
  };

  hideDateTimePicker = () => {
    this.props.toggleDateTimePicker(false);
  };

  handleTakePhoto = async () => {
    const photo = await takePhoto();
    this.props.choosePhoto(photo);
  };

  handlePickPhoto = async () => {
    const photo = await pickPhoto();
    this.props.choosePhoto(photo);
  };


  handleDatePicked = (date) => {
    this.props.chooseDate(date);
    this.props.toggleDateTimePicker(false);
  };

  goScanScreen = () => {
    const { navigate } = this.props.navigation;
    navigate('Scan');
  };

  renderTitleContainer = () => (
    <View style={styles.childContainer}>
      <View style={styles.inputContainer}>
        <Input
          containerStyle={styles.input}
          onChangeText={this.onChangeTitleText}
          value={this.props.title}
          returnKeyType="done"
          placeholder="タイトル"
          shake={this.props.validation}
          displayError
          errorStyle={{ color: '#cd5c5c' }}
          errorMessage={this.props.errorMessage}
          maxLength={100}
        />
      </View>
    </View>
  );

  renderPhotoContainer = () => {
    const photo = this.props.image
      ? (
        <Image
          style={styles.image}
          resizeMode="contain"
          source={{ uri: this.props.image.uri }}
        />
      )
      : <View />;

    return (
      <View style={styles.photoContainer}>
        {photo}
        <TouchableHighlight
          style={styles.photoButton}
          onPress={this.handleTakePhoto}
          underlayColor="#dcdcdc"
        >
          <MaterialIcons name="photo-camera" size={40} color="#a9a9a9" />
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.photoButton}
          onPress={this.handlePickPhoto}
          underlayColor="#dcdcdc"
        >
          <FontAwesome name="photo" size={40} color="#a9a9a9" />
        </TouchableHighlight>
      </View>
    );
  };

  renderDateContainer = () => (
    <View style={styles.childContainer}>
      <Text style={styles.tag}>発行日を選択</Text>
      <Button
        iconRight
        icon={<Entypo name="triangle-down" size={20} color="#A4A4A4" />}
        title={this.props.published}
        titleStyle={styles.dateTitle}
        buttonStyle={styles.dateButton}
        iconContainerStyle={styles.dateIcon}
        onPress={this.showDateTimePicker}
      />
      <View style={styles.showDateTimePicker}>
        <DateTimePicker
          isVisible={this.props.dateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
          date={this.props.chosenDate}
          locale="ja"
          maximumDate={this.props.currentTime}
          titleIOS="発行日を選択する"
          cancelTextIOS="キャンセル"
          confirmTextIOS="決定"
        />
      </View>
    </View>
  );

  renderButtonContainer = () => (
    <View style={styles.childContainer}>
      <Button
        icon={<FontAwesome name="barcode" size={22} color="white" />}
        title="バーコード読み取り"
        onPress={this.goScanScreen}
        titleStyle={styles.buttonText}
        buttonStyle={styles.buttonContainer}
        iconContainerStyle={styles.buttonIcon}
      />
    </View>
  );

  render() {
    const photoContainer = this.renderPhotoContainer();
    const titleContainer = this.renderTitleContainer();
    const dateContainer = this.renderDateContainer();
    const buttonContainer = this.renderButtonContainer();

    return (
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.container}
      >
        {photoContainer}
        {titleContainer}
        {dateContainer}
        {buttonContainer}
      </KeyboardAvoidingView>
    );
  }
}

EntryScreen.navigationOptions = {
  title: '本の登録',
};

EntryScreen.propTypes = {
  title: PropTypes.string.isRequired,
  chosenDate: PropTypes.instanceOf(Date).isRequired,
  published: PropTypes.string.isRequired,
  image: PropTypes.shape({
    uri: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    exif: PropTypes.string,
    base64: PropTypes.string,
  }).isRequired,
  dateTimePickerVisible: PropTypes.bool.isRequired,
  validation: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  changeTitle: PropTypes.func.isRequired,
  chooseDate: PropTypes.func.isRequired,
  choosePhoto: PropTypes.func.isRequired,
  toggleDateTimePicker: PropTypes.func.isRequired,
  validateTitle: PropTypes.func.isRequired,

  currentTime: PropTypes.instanceOf(Date),
};

EntryScreen.defaultProps = {
  currentTime: new Date(),
};
