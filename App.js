import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import HomeScreen from './HomeScreen'
import NewBookAdd from './NewBookAdd'
import DetailBookView from './DetailBookView';
import SearchScreen from './SearchScreen';

const RootStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    New: {
      screen: NewBookAdd,
    },
    Details: {
      screen: DetailBookView,
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