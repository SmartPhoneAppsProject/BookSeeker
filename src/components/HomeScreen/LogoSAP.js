import React from 'react';
import {
  View,
  Image,
} from 'react-native';

import { LogoSAP as styles } from './Styles';

const LogoSAP = () => (
  <View style={styles.container}>
    <Image
      style={styles.image}
      source={require('../../../assets/SAP_white.png')}
    />
  </View>
);

export default LogoSAP;
