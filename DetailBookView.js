import React from 'react';
import { AppRegistry,StyleSheet, Text, View } from 'react-native';

export default class DetailBookView extends React.Component {
    static navigationOptions = {
        title: 'DetailBookView',
    };
  render() {
    return (
      <View >
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}

AppRegistry.registerComponent('detailBookView',()=>detailBookView);