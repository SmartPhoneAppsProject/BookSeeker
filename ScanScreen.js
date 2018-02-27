import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Camera, BarCodeScanner, Permissions } from 'expo';

export default class ScanScreen extends React.Component {
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
          this.bundleData(data);
        }
      } else {
        this.setState({ status: 'invalid' });
        setTimeout(() => {
          this.setState({ status: 'reading' });
        }, 1000);
      }
    }
  }

  bundleData(janCode) {
    const { params } = this.props.navigation.state;

    const json = JSON.stringify({
      title: params.title,
      image: params.photo.base64,
      published_at: params.publishedAt,
      jan_code: janCode
    });

    console.log('object is parsed to JSON');

    // const tags = {
    //   tags: params.tags,
    // };
    // console.log(tags);

    this.postData(json);
  }

  async postData(json) {
    const uri = 'https://go-api-staging.herokuapp.com/books';
    const headers = new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json'
    });
    const options = {
      method: 'POST',
      headers: headers,
      body: json,
    };
    const request = new Request(uri, options);

    try {
      // fix
      console.log('try post');

      const response = await fetch(request);
      // const responseJson = await response.json();
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { permissionsGranted } = this.state;
    let statusText = <View />;
    if (this.state.status == 'ok') {
      statusText = <Text style={styles.statusOk}>読み取りました</Text>;
    } else if (this.state.status == 'invalid') {
      statusText = <Text style={styles.statusNo}>無効な値です</Text>;
    }

    if (permissionsGranted === null) {
      return <Text>カメラを使用できません</Text>;
    } else if (permissionsGranted === false) {
      return <Text>カメラにアクセスできません</Text>;
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerWarn}>978<Text style={styles.text}>から始まるバーコードを画面に合わせてください</Text></Text>
          </View>
          <View style={styles.reader}>
            <View style={styles.cameraSide}>
              <Text></Text>
            </View>
            <BarCodeScanner style={styles.camera}
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
    }
  }
}

const styles = StyleSheet.create({
  container: {
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