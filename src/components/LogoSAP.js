import React from 'react';
import {
  View,
  Image,
  StyleSheet,
} from 'react-native';

export const LogoSAP = () => (
  <View style={styles.container}>
    <Image
      style={{ width: 35, height: 35 }}
      source={require('../../assets/SAP_white.png')}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: '#c0c0c0',
    borderRadius: 50,
  },
});

export { LogoSAP as default };
