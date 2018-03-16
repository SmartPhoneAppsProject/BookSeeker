import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
} from 'react-native';
import {
  BarCodeScanner,
  Permissions
} from 'expo';
import { Button } from 'react-native-elements';

import { rentBook } from '../utils/Network';
import { NavigationActions } from "react-navigation";

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

  goToHomeScreen = () => {
    // https://github.com/react-navigation/react-navigation/issues/1448
    const actions = [NavigationActions.navigate({ routeName: 'Home' })];

    const resetAction = NavigationActions.reset({
      index: actions.length - 1,
      actions
    });

    this.props.navigation.dispatch(resetAction)
  };

  lendBook = (janCode) => {
    const json = JSON.stringify({
      jan_code: janCode,
      status: true
    });

    this.changeBookStatus(json);
  };

  returnBook = (janCode) => {
    const json = JSON.stringify({
      jan_code: janCode,
      status: false
    });

    this.changeBookStatus(json);
  };

  changeBookStatus = (json) => {
    rentBook(json)
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
      })
      .catch(error => {
        console.warn(error);
        rentBook(json)
          .then(response => response.json())
          .then(responseJson => {
            console.log(responseJson);
          })
          .catch(error => console.error(error));
      });
  };

  _handleBarCodeRead = ({ type, data }) => {
    const { action } = this.props.navigation.state.params;

    console.log(data);
    if (`${BarCodeScanner.Constants.BarCodeType.ean13}` == type) {
      if (978 == data.slice(0, 3)) { //ISBNを読み取ったとき
        if (this.state.janCode != data) {
          this.setState({
            janCode: data,
            status: 'ok'
          });
          const janCode = parseInt(data);
          if (action == 'return') {
            this.returnBook(janCode);
          } else if (action == 'lend') {
            this.lendBook(janCode);
          }
          this.goToHomeScreen();
        }
      } else { //バーコードであるがISBNでないとき
        this.setState({ status: 'invalid' });
      }
      setTimeout(() => {
        this.setState({ status: 'reading' });
      }, 1000);
    } else { //バーコードでないとき
      this.setState({ status: 'reading' });
    }
  };

  renderNoPermissions = () => {
    return (
      <View style={styles.noPermissions}>
        <Text style={styles.noPermissionsText}>
          カメラを使用できません
        </Text>
      </View>
    );
  };

  renderHeader = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.stringWarn}>
          978
          <Text style={styles.text}>
            から始まるバーコードを画面に合わせてください
          </Text>
        </Text>
      </View>
    );
  };

  renderCamera = () => {
    return (
      <View style={styles.cameraContainer}>
        <BarCodeScanner
          style={styles.camera}
          onBarCodeRead={this._handleBarCodeRead}
        >
          <View style={styles.cameraInline}>
            <Text/>
          </View>
        </BarCodeScanner>
      </View>
    );
  };

  renderFooter = () => {
    let statusText = <View/>;
    if (this.state.status === 'ok') {
      statusText = <Text style={styles.statusOk}>読み取りました</Text>;
    } else if (this.state.status === 'invalid') {
      statusText = <Text style={styles.statusNo}>数字をお確かめください</Text>;
    }

    return (
      <View style={styles.footer}>
        <Button
          title={statusText}
          loading={(this.state.status === 'reading')}
          loadingProps={{ size: "large", color: "rgba(111, 202, 186, 1)" }}
          titleStyle={{ fontWeight: "700" }}
          clear={true}
        />
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
          source={require('../../assets/ISBN_sample.png')}
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
    color: 'white'
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
    height: 93 / 2
  },
  body: {
    alignItems: 'center',
    margin: 5,
  },
  cameraContainer: {
    width: width * 2 / 3,
    height: width * 2 / 3,
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
    color: '#3eb370'
  },
  statusNo: {
    textAlign: 'center',
    fontSize: 30,
    color: '#e95464'
  },
});
