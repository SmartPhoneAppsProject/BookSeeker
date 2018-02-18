import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import FindBookList from './FindBookList'
import NewBookAdd from './NewBookAdd'
import DetailBookView from './DetailBookView';

const RootStack = StackNavigator(
    {
        List: {
            screen: FindBookList,
        },
        New: {
            screen: NewBookAdd,
        },
        Details: {
            screen: DetailBookView,
        },
    },
    {
        initialRouteName: 'List',
        //header config
        navigationOptions: {
            title: 'DetailBookView',
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