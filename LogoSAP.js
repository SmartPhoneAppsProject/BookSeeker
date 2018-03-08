import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class LogoSAP extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{ width: 35, height: 35 }}
          source={require('./static/SAP.png')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: '#ffffff',
    borderRadius: 50,
  },
});