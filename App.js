import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
    }
);

export default class BookSeeker extends React.Component {
    render() {
        return <RootStack />;
    }
}
