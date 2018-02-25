import React, { Component } from 'react';
import { StyleSheet, TextInput, View, Button } from 'react-native';

export default class EditText extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
        }
    }

    seachStart(text) {
        console.log(text)
        let searchtext=text.split(" ")
        let newbooks = [];
        let data = this.props.books;

        for (i in data) {
            for(let k=0;k<data[0].tags.length;k++) {
                for(let j=0; j<  searchtext.length;j++) {
                    if (searchtext[j].toUpperCase() == data[0].tags[k].name.toUpperCase()
                        ||searchtext[j]==data[i].title) {
                            newbooks.push(data[i])
                    }
                }
            }
        }
        this.props.searchBack(newbooks)
    }

    render() {
        return (
            <View>
                <TextInput
                    placeholder="タグ検索"
                    onChangeText={(searchText) => this.setState({ searchText })}
                    value={this.state.searchText}
                />

                <Button style={styles.seachButton} onPress={() => this.seachStart(this.state.searchText)}
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