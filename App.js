import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import FindBookList from './FindBookList'
import NewBookAdd from './NewBookAdd'
import DetailScreen from './DetailScreen';

const RootStack = StackNavigator(
    {
        List: {
            screen: FindBookList,
        },
        New: {
            screen: NewBookAdd,
        },
        Details: {
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
