import React, { Component } from 'react';
import { StyleSheet, TextInput, View, Button } from 'react-native';

export default class EditText extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
        }
    }

    clickSearchButton() {

    }

    render() {
        return (
            <View>
                <TextInput
                    placeholder="タグ検索"
                    onChangeText={(searchText) => this.setState({ searchText })}
                    value={this.state.searchText}
                />

                <Button style={styles.seachButton} onPress={() => console.log('search')}
                    title="検索"
                />
            </View>

        );
    }
}
const styles = StyleSheet.create({
    seachButton: {
        width: 60,
        height: 40,
        backgroundColor: 'blue',
        flexDirection: 'row',
        //justifyContent: 'space-between',
    },
});