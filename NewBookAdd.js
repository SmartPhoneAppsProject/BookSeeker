import React from 'react';
import { AppRegistry,StyleSheet, Text, View } from 'react-native';

export default class NewBookAdd extends React.Component {
    static navigationOptions = {
        title: 'newBook',
    };
  render() {
    return (
      <View>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
  }
}

AppRegistry.registerComponent('newBookAdd',()=>newBookAdd);