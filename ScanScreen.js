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
            style={styles.reader}
          />
        </View>
      );
    }
  }

  _handleBarCodeRead = ({ type, data }) => {
    if (`${BarCodeScanner.Constants.BarCodeType.ean13}` == type) { //janCodeを読み取ったとき
      if (978 == data.slice(0, 3) && this.state.janCode != data) {
        this.setState({ janCode: data });
        alert(data);
      }
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