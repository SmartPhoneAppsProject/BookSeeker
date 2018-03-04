import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import FindBookList from './FindBookList'
import DetailScreen from './DetailScreen';
import EntryScreen from './EntryScreen';
import ScanScreen from './ScanScreen';

const RootStack = StackNavigator(
  {
    List: {
      screen: FindBookList,
    },
    Entry: {
      screen: EntryScreen,
    },
    Scan: {
      screen: ScanScreen,
    },
    Detail: {
      screen: DetailScreen,
    },
  },
  {
    initialRouteName: 'List',
    //header config
    navigationOptions: {
      title: 'DetailScreen',
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

export default class BookSeeker extends React.Component {
  render() {
    return <RootStack />;
  }
}

AppRegistry.registerComponent('BookSeeker', () => BookSeeker);
