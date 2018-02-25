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

  render() {
    //todo debug
    console.log(this.state);
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>カメラを使用できません</Text>;
    } else if (hasCameraPermission === false) {
      return <Text>カメラにアクセスできません</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <BarCodeScanner
            onBarCodeRead={this._handleBarCodeRead}
            style={StyleSheet.absoluteFill}
          />
        </View>
      );
    }
  }

  _handleBarCodeRead = ({ type, data }) => {
    if (`${BarCodeScanner.Constants.BarCodeType.ean13}` == type) { //janCodeを読み取ったとき
      if (978 == data.slice(0, 3)) {
        this.setState({ janCode: data });
        alert(this.state.janCode);
      } else {
        alert("無効な値です");
      }
    }
  }
}