import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import HomeScreen from './src/components/screens/HomeScreen'
import SearchScreen from './src/components/SearchView';
import DetailScreen from './src/components/screens/DetailScreen';
import EntryScreen from './src/components/screens/EntryScreen';
import ScanScreen from './src/components/screens/ScanScreen';
import EntryTagsScreen from "./src/components/screens/EntryTagsScreen";
import LentScanScreen from "./src/components/screens/LentScanScreen";

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
    EntryTags: {
      screen: EntryTagsScreen,
    },
    Detail: {
      screen: DetailScreen,
    },
    Search: {
      screen: SearchScreen,
    },
    LentScan: {
      screen: LentScanScreen,
    }
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

export default class BookSeeker extends Component {
  render() {
    return <RootStack/>;
  }
}

// AppRegistry.registerComponent('BookSeeker', () => BookSeeker);
