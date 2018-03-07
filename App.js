import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import HomeScreen from './HomeScreen'
import SearchScreen from './SearchScreen';
import DetailScreen from './DetailScreen';
import EntryScreen from './EntryScreen';
import ScanScreen from './ScanScreen';

const RootStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        headerStyle: {
          backgroundColor: '#c0c0c0',
          borderColor: "transparent",
          borderWidth: 0,
          shadowColor: 'transparent',
          shadowRadius: 0,
          elevation: 0,       //remove shadow on Android
          shadowOpacity: 0,   //remove shadow on iOS
          shadowOffset: {
            height: 0,
            width: 0,
          },
          shadowRadius: 0,
        },
        headerTintColor: '#ffffff',
      },
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
    Search: {
      screen: SearchScreen,
    },
  },
  {
    initialRouteName: 'Home',
    //header config
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#c0c0c0',
        borderColor: "transparent",
        borderWidth: 0,
        shadowColor: 'transparent',
        shadowRadius: 0,
        elevation: 0,       //remove shadow on Android
        shadowOpacity: 0,   //remove shadow on iOS
        shadowOffset: {
          height: 0,
          width: 0,
        },
        shadowRadius: 0,
      },
      headerTintColor: '#ffffff',
    },
  }
);

export default class BookSeeker extends React.Component {
  render() {
    return <RootStack />;
  }
}

AppRegistry.registerComponent('BookSeeker', () => BookSeeker);
