import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';

export default class ScanScreen extends React.Component {
  static navigationOptions = {
    title: 'ScanScreen',
  };

  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      janCode: null,
    };
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  _handleBarCodeRead = ({ type, data }) => {
    if (`${BarCodeScanner.Constants.BarCodeType.ean13}` == type || 978 == data.slice(0, 3)) { //ISBNを読み取ったとき
      if (this.state.janCode != data) {
        this.setState({ janCode: data });
        this.bundleData(data);
      } else {
        console.log('diff');
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
      console.log('e:');
      console.error(error);
    }
  }

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>カメラを使用できません</Text>;
    } else if (hasCameraPermission === false) {
      return <Text>カメラにアクセスできません</Text>;
    } else {
      return (
        <View style={styles.container}>
          <BarCodeScanner
            onBarCodeRead={this._handleBarCodeRead}
            style={styles.reader} />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  reader: {
    flex: 1,
  },
});