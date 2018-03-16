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

import { postBook } from './Network';

export default class ScanScreen extends Component {
  static navigationOptions = {
    title: 'バーコードリーダー',
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

  _handleBarCodeRead = ({ type, data }) => {
    console.log(data);
    if (`${BarCodeScanner.Constants.BarCodeType.ean13}` == type) {
      if (978 == data.slice(0, 3)) { //ISBNを読み取ったとき
        if (this.state.janCode != data) {
          this.setState({
            janCode: data,
            status: 'ok'
          });
          setTimeout(() => {
            const janCode = parseInt(data);
            this.registerBook(janCode);
          }, 1000);
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

  registerBook = (janCode) => {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;

    const json = JSON.stringify({
      title: params.title,
      // image: params.photo.base64,
      image: '',
      published_at: params.publishedAt,
      jan_code: janCode
    });

    postBook(json)
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        const book = {
          id: responseJson.id,
        };
        navigate('EntryTags', { book });

      })
      .catch(error => {
        console.warn(error);
        postBook(json)
          .then(response => response.json())
          .then(responseJson => {
            console.log(responseJson);
            const book = {
              id: responseJson.id,
            };
            navigate('EntryTags', { book });
          })
          .catch(error => console.error(error));
      });
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
    if (this.state.status == 'ok') {
      statusText = <Text style={styles.statusOk}>読み取りました</Text>;
    } else if (this.state.status == 'invalid') {
      statusText = <Text style={styles.statusNo}>数字をお確かめください</Text>;
    }

    return (
      <View style={styles.footer}>
        <Button
          title={statusText}
          loading={(this.state.status == 'reading')}
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
          source={require('./assets/ISBN_sample.png')}
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
