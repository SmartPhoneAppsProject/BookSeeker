import React from 'react';
import {
  Text,
  View,
} from 'react-native';

import { EmptyTags as styles } from './Styles';

const EmptyTags = () => (
  <View style={styles.container}>
    <Text style={styles.text}>データを取得できませんでした</Text>
  </View>
);

export default EmptyTags;
