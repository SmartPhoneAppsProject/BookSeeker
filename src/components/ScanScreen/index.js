import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
  ActivityIndicator,
} from 'react-native';
import {
  BarCodeScanner,
  Permissions,
} from 'expo';
import { Text } from 'react-native-elements';

import { index as styles } from './Styles';

export default class ScanScreen extends Component {
  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    // this.setState({ permissionsGranted: status === 'granted' });
    if (status === 'granted') {
      this.props.permissionsGranted();
    } else {
      this.props.permissionsDenied();
    }
  }

  goEntryTagsScreen = (isbn) => {
    const { navigation } = this.props;
    navigation.navigate('EntryTags', {
      title: this.props.title,
      image: this.props.image.base64,
      published: this.props.published,
      isbn,
    });
  }

  handleBarCodeRead = ({ type, data }) => {
    if (BarCodeScanner.Constants.BarCodeType.ean13 === type) {
      if (data.slice(0, 3) === '978') { // ISBNを読み取ったとき
        if (this.props.isbn !== data) {
          this.props.isbnOk(data);
          const isbn = String(parseInt(data, 10));
          this.goEntryTagsScreen(isbn);
        }
      } else { // バーコードであるがISBNでないとき
        this.props.isbnInvalid();
      }
      setTimeout(() => {
        setTimeout(() => this.props.isbnReading(), 1000);
      }, 1000);
    } else { // バーコードでないとき
      this.props.isbnReading();
    }
  };

  renderNoPermissions = () => (
    <View style={styles.noPermissions}>
      <Text style={styles.noPermissionsText}>
        カメラを使用できません
      </Text>
    </View>
  );

  renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.stringWarn}>
        978
        <Text style={styles.text}>
          から始まるバーコードを画面に合わせてください
        </Text>
      </Text>
    </View>
  );

  renderCamera = () => (
    <View style={styles.cameraContainer}>
      <BarCodeScanner
        style={styles.camera}
        onBarCodeRead={this.handleBarCodeRead}
      >
        <View style={styles.cameraInline}>
          <Text />
        </View>
      </BarCodeScanner>
    </View>
  );

  renderFooter = () => {
    let statusText = <ActivityIndicator size="large" />;
    if (this.props.cameraStatus === 'ok') {
      statusText = <Text h4 style={styles.statusOk}>読み取りました</Text>;
    } else if (this.props.cameraStatus === 'invalid') {
      statusText = <Text h4 style={styles.statusNo}>数字をお確かめください</Text>;
    }

    return (
      <View style={styles.footer}>
        {statusText}
      </View>
    );
  };

  renderScanScreen = () => {
    const header = this.renderHeader();
    const camera = this.renderCamera();
    const footer = this.renderFooter();

    return (
      <View style={styles.cameraScreen}>
        {header}
        <Image
          style={styles.imageSize}
          source={require('../../../assets/ISBN_sample.png')}
        />
        {camera}
        {footer}
      </View>
    );
  };

  render() {
    const screen = this.props.permissions
      ? this.renderScanScreen()
      : this.renderNoPermissions();

    return (
      <View style={styles.container}>
        {screen}
      </View>
    );
  }
}

ScanScreen.navigationOptions = {
  title: 'バーコードリーダー',
};

ScanScreen.propTypes = {
  title: PropTypes.string.isRequired,
  published: PropTypes.string.isRequired,
  image: PropTypes.string,
  permissions: PropTypes.oneOf(['granted', 'denied']).isRequired,
  cameraStatus: PropTypes.oneOf(['reading', 'ok', 'invalid']).isRequired,
  permissionsGranted: PropTypes.func.isRequired,
  permissionsDenied: PropTypes.func.isRequired,
  isbnReading: PropTypes.func.isRequired,
  isbnOk: PropTypes.func.isRequired,
  isbnInvalid: PropTypes.func.isRequired,
};

ScanScreen.defaultProps = {
  image: '',
};
