import React from 'react';
import {
  Text,
  View,
} from 'react-native';

import { EmptyComponent as styles } from './Styles';

const EmptyComponent = () => (
  <View style={styles.container}>
    <Text style={styles.text}>データを取得できませんでした</Text>
    <Text style={styles.text}>画面を下にスワイプし更新してください</Text>
  </View>
);

export default EmptyComponent;
