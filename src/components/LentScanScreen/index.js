import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
  ActivityIndicator,
} from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Text } from 'react-native-elements';

import { index as styles } from './Styles';
import { navigate } from '../../utils/NavigationService';

export default class LentScanScreen extends Component {
  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    if (status === 'granted') {
      this.props.permissionsGranted();
    } else {
      this.props.permissionsDenied();
    }
  }


  handleBarCodeRead = ({ type, data }) => {
    const {
      bookStatus,
      validJANCODE,
      invalidJANCODE,
      readingJANCODE,
      changeStatusFromJancode,
    } = this.props;

    if (BarCodeScanner.Constants.BarCodeType.ean13 === type) {
      if (data.slice(0, 3) === '978') { // JANCODEを読み取ったとき
        const jancode = String(parseInt(data, 10));
        validJANCODE(jancode);
        changeStatusFromJancode(jancode, !bookStatus);
        navigate('Home');
        return;
      }
      invalidJANCODE();
      setTimeout(() => readingJANCODE(), 1000);
      return;
    }
    readingJANCODE();
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
          source={require('../../../assets/JANCODE_sample.png')}
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

LentScanScreen.navigationOptions = {
  title: '貸し出し',
};

LentScanScreen.propTypes = {
  bookStatus: PropTypes.bool.isRequired,
  permissions: PropTypes.oneOf(['granted', 'denied']).isRequired,
  cameraStatus: PropTypes.oneOf(['reading', 'ok', 'invalid']).isRequired,
  jancode: PropTypes.string,
  permissionsGranted: PropTypes.func.isRequired,
  permissionsDenied: PropTypes.func.isRequired,
  readingJANCODE: PropTypes.func.isRequired,
  validJANCODE: PropTypes.func.isRequired,
  invalidJANCODE: PropTypes.func.isRequired,
  changeStatusFromJancode: PropTypes.func.isRequired,
};

LentScanScreen.defaultProps = {
  jancode: null,
};
