import React from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import PTRView from 'react-native-pull-to-refresh';

const PullRefresh = () => (
  <View style={styles.container}>
    <PTRView onRefresh={this.props.refresh}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>データを取得できませんでした。</Text>
        <Text style={styles.text}>画面を下にスワイプし更新してください。</Text>
      </View>
    </PTRView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  text: {
    fontSize: 17,
  },
});

export default PullRefresh;
