import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {
  BarCodeScanner,
  Permissions,
} from 'expo';
import { Text } from 'react-native-elements';

import { rentBook } from '../../utils/Network';
import { navigate } from '../../utils/NavigationService';

export default class lentScanScreen extends Component {
  static navigationOptions = {
    title: '貸し出し',
  };

  constructor(props) {
    super(props);
    this.state = {
      janCode: null,
      permissionsGranted: false,
      status: 'reading',
    };
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ permissionsGranted: status === 'granted' });
  }

  lendBook = (janCode) => {
    const json = JSON.stringify({
      jan_code: janCode,
      status: true,
    });

    this.changeBookStatus(json);
  };

  returnBook = (janCode) => {
    const json = JSON.stringify({
      jan_code: janCode,
      status: false,
    });

    this.changeBookStatus(json);
  };

  changeBookStatus = (json) => {
    rentBook(json)
      .then(response => response.json())
      .then((responseJson) => {
        console.log(responseJson);
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
    const { action } = this.props.navigation.state.params;

    console.log(data);
    if (BarCodeScanner.Constants.BarCodeType.ean13 === type) {
      if (data.slice(0, 3) === '978') { // ISBNを読み取ったとき
        if (this.state.janCode !== data) {
          this.setState({
            janCode: data,
            status: 'ok',
          });
          const janCode = parseInt(data, 10);
          if (action === 'return') {
            this.returnBook(janCode);
          } else if (action === 'lend') {
            this.lendBook(janCode);
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

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  noPermissions: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  noPermissionsText: {
    color: 'white',
  },
  cameraScreen: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    margin: 5,
  },
  stringWarn: {
    color: '#cd5c5c',
  },
  text: {
    color: '#f3f3f3',
    textAlign: 'center',
  },
  imageSize: {
    width: 221 / 2,
    height: 93 / 2,
  },
  body: {
    alignItems: 'center',
    margin: 5,
  },
  cameraContainer: {
    width: width * (2 / 3),
    height: width * (2 / 3),
    borderColor: '#f3f3f3',
    borderWidth: 1,
  },
  camera: {
    flex: 1,
  },
  cameraInline: {
    flex: 0.5,
    borderColor: '#cd5c5c',
    borderBottomWidth: 1,
  },
  footer: {
    margin: 5,
  },
  statusOk: {
    textAlign: 'center',
    fontSize: 30,
    color: '#3eb370',
  },
  statusNo: {
    textAlign: 'center',
    fontSize: 30,
    color: '#e95464',
  },
});
