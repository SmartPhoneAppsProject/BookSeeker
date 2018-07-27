import React from 'react';
import {
  View,
  Image,
} from 'react-native';

import { LogoSAP as styles } from './Styles';

export const LogoSAP = () => (
  <View style={styles.container}>
    <Image
      style={{ width: 35, height: 35 }}
      source={require('../../../assets/SAP_white.png')}
    />
  </View>
);

export default LogoSAP;
