import React, { Component } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, View, Text, Image, Dimensions } from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class AddListView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <FlatList
                data={this.props.books}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity style={list.item}
                            onPress={() => navigate('Details', { item })} >
                            <Image style={list.image}
                                source={{ uri: item.image }} />
                            <View style={list.info}>
                                <View style={list.infoStatus}>
                                    <Text style={list.statusOk}>{`${item.status}`}</Text>
                                    <Text style={list.statusNo}>{`${item.status}`}</Text>
                                </View>
                                <Text style={list.infoTitle}>{item.title}</Text>
                            </View>
                        </TouchableOpacity >
                    );
                }}
            />
        );
    }
}

const { width } = Dimensions.get('window');

const list = StyleSheet.create({
    item: {
        flexDirection: 'row',
        borderColor: '#CCC',
        borderWidth: 1,
    },
    image: {
        width: 64,
        height: 64,
    },
    info: {
        width: width - 64,
        height: 64,
        flexDirection: 'column',
        alignItems: 'stretch',
    },
    infoStatus: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    statusOk: {
        backgroundColor: 'red',
        width: '30%',
        fontSize: 15,
        textAlign: 'center',
        paddingHorizontal: 5,
        paddingVertical: 1,
    },
    statusNo: {
        backgroundColor: 'red',
        width: '30%',
        fontSize: 15,
        color: '#ABABAB',
        textAlign: 'center',
        paddingHorizontal: 5,
        paddingVertical: 1,
    },
    infoTitle: {
        flex: 2,
        fontSize: 30,
        textAlign: 'center',
    }
});