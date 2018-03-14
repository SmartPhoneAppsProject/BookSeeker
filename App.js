import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';

import HomeScreen from './src/components/screens/HomeScreen'
import SearchScreen from './src/components/screens/SearchScreen';
import DetailScreen from './src/components/screens/DetailScreen';
import EntryScreen from './src/components/screens/EntryScreen';
import ScanScreen from './src/components/screens/ScanScreen';

const RootStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
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
      },
      headerTintColor: '#ffffff',
    },
  }
);

export default class BookSeeker extends Component {
  render() {
    return <RootStack/>;
  }
}

AppRegistry.registerComponent('BookSeeker', () => BookSeeker);
