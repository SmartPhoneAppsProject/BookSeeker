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
  constructor(props) {
    super(props);
    this.state = {
      isbn: null,
      permissionsGranted: false,
      status: 'reading',
    };
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ permissionsGranted: status === 'granted' });
  }

  handleBarCodeRead = ({ type, data }) => {
    const { navigation } = this.props;

    console.log(data);
    if (BarCodeScanner.Constants.BarCodeType.ean13 === type) {
      if (data.slice(0, 3) === '978') { // ISBNを読み取ったとき
        if (this.state.isbn !== data) {
          this.setState({
            isbn: data,
            status: 'ok',
          });
          setTimeout(() => {
            const isbn = String(parseInt(data, 10));
            navigation.navigate('EntryTags', {
              title: this.props.title,
              image: this.props.image.base64,
              published: this.props.published,
              isbn,
            });
          }, 1000);
        }
      } else { // バーコードであるがISBNでないとき
        this.setState({ status: 'invalid' });
      }
      setTimeout(() => {
        this.setState({ status: 'reading' });
      }, 1000);
    } else { // バーコードでないとき
      this.setState({ status: 'reading' });
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
    if (this.state.status === 'ok') {
      statusText = <Text h4 style={styles.statusOk}>読み取りました</Text>;
    } else if (this.state.status === 'invalid') {
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
    const screen = this.state.permissionsGranted
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
};

ScanScreen.defaultProps = {
  image: '',
};
