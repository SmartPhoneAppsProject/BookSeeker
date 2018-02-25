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
    };
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  _handleBarCodeRead = ({ type, data }) => {
    if (`${BarCodeScanner.Constants.BarCodeType.ean13}` == type || 978 == data.slice(0, 3)) { //ISBNを読み取ったとき
      if (this.state.janCode != data) {
        this.postData(data);
      } else {
        console.log('diff');
      }
    }
  }

  postData(janCode) {
    const { params } = this.props.navigation.state;
    const book = {
      title: params.title,
      image: params.photo.base64,
      published_at: '',
      jan_code: janCode
    };
    const tags = {
      tags: params.tags,
    };
    console.log(tags);
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
            style={styles.reader}/>
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