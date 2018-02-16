import React, { Component } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, Text, } from 'react-native';

export default class AddListView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            isLoading: true,
        }
        // this.props.updateState(this.state);
    }
    // <View style={styles.container}>
    // <FlatList
    // data={[
    //     {key:'fbdfndgnfmfhnm1'},
    //     {key:'bdgngnfmhm2'},
    //     {key:'gdhdgjgjfjf3'},
    // ]}
    // renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
    // />
    // </View>
    render() {
        return (
            <FlatList
                data={this.props.books}
                renderItem={({ item }) => {
                    return <TouchableOpacity onPress={() => console.warn(item.key)}>
                        <Text style={styles.item}>{item.title}</Text>
                    </TouchableOpacity>
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