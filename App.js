import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {
    StackNavigator,
} from 'react-navigation';

import FindListView from './FindBookList'
import NewBookAdd from './NewBookAdd'
import DetailBook from './DetailBookView'


const bookSeeker = StackNavigator({
    findList: { screen: FindListView },
    newBook: { screen: NewBookAdd },
    detailBook: { screen: DetailBook },
    //}//,{
    //initialRouteName: 'findList'
});
export default bookSeeker;
