import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  BarCodeScanner,
  Permissions
} from 'expo';
import { NavigationActions } from 'react-navigation';

import { postBook } from './networking';

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
    this.props.navigation.state.key = 'Home';
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
    } else { //バーコードでないとき
      this.setState({ status: 'reading' });
    }
  };

  goToHomeScreen = () => {
    // https://github.com/react-navigation/react-navigation/issues/1448
    const actions = [NavigationActions.navigate({ routeName: 'Home' })]

    const resetAction = NavigationActions.reset({
      index: actions.length - 1,
      actions
    });

    this.props.navigation.dispatch(resetAction)
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
        // this.goToHomeScreen();
        // this.props.navigation.dispatch(NavigationActions.back({ key: state.routeName }));

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
            // this.goToHomeScreen();
            // this.props.navigation.dispatch(NavigationActions.back({ key: state.routeName }));
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

  renderCamera = () => {
    let statusText = <View/>;
    if (this.state.status == 'ok') {
      statusText = <Text style={styles.statusOk}>読み取りました</Text>;
    } else if (this.state.status == 'invalid') {
      statusText = <Text style={styles.statusNo}>無効な値です</Text>;
    }

    return (
      <View style={styles.cameraScreen}>
        <View style={styles.header}>
          <Text style={styles.headerWarn}>
            978
            <Text style={styles.text}>
              から始まるバーコードを画面に合わせてください
            </Text>
          </Text>
        </View>
        <View style={styles.reader}>
          <View style={styles.cameraSide}>
            <Text></Text>
          </View>
          <BarCodeScanner
            style={styles.camera}
            onBarCodeRead={this._handleBarCodeRead}
          />
          <View style={styles.cameraSide}>
            <Text></Text>
          </View>
        </View>
        <View style={styles.footer}>
          {statusText}
        </View>
      </View>
    );
  };

  render() {
    const cameraScreen = this.state.permissionsGranted
      ? this.renderCamera()
      : this.renderNoPermissions();
    return <View style={styles.container}>{cameraScreen}</View>;
  }
}

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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#16160e',
  },
  text: {
    color: '#f3f3f3',
    textAlign: 'center',
  },
  header: {
    flex: 1,
    justifyContent: 'space-around',
    margin: 5,
  },
  headerWarn: {
    color: '#fef263',
  },
  reader: {
    flex: 1,
    flexDirection: 'row',
  },
  cameraSide: {
    flex: 1,
  },
  camera: {
    flex: 8,
    borderColor: '#f3f3f3',
    borderWidth: 1,
  },
  footer: {
    flex: 5,
    justifyContent: 'space-around',
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
