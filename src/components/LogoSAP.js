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
          source={require('../../assets/SAP.png')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: '#c0c0c0',
    borderRadius: 50,
  },
});