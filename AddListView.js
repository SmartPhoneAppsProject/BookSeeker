import React, { Component } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, Text, } from 'react-native';
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
                        <TouchableOpacity onPress={() => navigate('Details', { item })}>
                            <Text style={styles.item}>{item.title}</Text>
                        </TouchableOpacity>
                    );
                }}
            />
        );
    }
}

const styles = StyleSheet.create({
    container:
        {
            flex: 1,
            paddingTop: 22,
        },
    item:
        {
            padding: 10,
            fontSize: 18,
            height: 44,
        },
});