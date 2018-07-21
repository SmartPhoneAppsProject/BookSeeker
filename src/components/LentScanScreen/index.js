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
import { rentBook } from '../../utils/Network';
import { navigate } from '../../utils/NavigationService';

export default class LentScanScreen extends Component {
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

  borrowBook = (isbn) => {
    const json = JSON.stringify({
      jan_code: isbn,
      status: true,
    });

    this.changeBookStatus(json);
  };

  returnBook = (isbn) => {
    const json = JSON.stringify({
      jan_code: isbn,
      status: false,
    });

    this.changeBookStatus(json);
  };

  changeBookStatus = (json) => {
    rentBook(json)
      .then(response => response.json())
      .then((responseJson) => {
      })
      .catch((error) => {
        console.warn(error);
        rentBook(json)
          .then(response => response.json())
          .then((responseJson) => {
            console.log(responseJson);
          })
          .catch(e => console.error(e));
      });
  };

  handleBarCodeRead = ({ type, data }) => {
    const { action } = this.props;

    if (BarCodeScanner.Constants.BarCodeType.ean13 === type) {
      if (data.slice(0, 3) === '978') { // ISBNを読み取ったとき
        if (this.state.isbn !== data) {
          this.setState({
            isbn: data,
            status: 'ok',
          });
          const isbn = parseInt(data, 10);
          if (action === 'return') {
            this.returnBook(isbn);
          } else if (action === 'borrow') {
            this.borrowBook(isbn);
          }
          navigate('Home');
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

LentScanScreen.navigationOptions = {
  title: '貸し出し',
};

LentScanScreen.propTypes = {
  action: PropTypes.oneOf(['borrow', 'return']).isRequired,
};
