import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Button
} from 'react-native';

import ListView from './ListView';

export default class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searching: false,
      searchText: '',
      books: this.props.books,
      staticBooks: this.props.books,
    };
  }

  startSearch = (text) => {
    this.setState({
      searching: true,
      searchText: text,
    });
    this.search();
    // this.props.setBooks(this.state.books);
  }

  cancelSearch = () => {
    this.setState({
      searching: false,
      searchText: '',
    });
    this.props.resetBooks();
  }

  search = () => {
    const queries = this.state.searchText.split(' ');
    let books = this.state.staticBooks;
    let results = [];
    let tmpResults = [];

    for (let query of queries) {
      if (query) { //比較する文字列があるか
        if ('#' == query.charAt(0)) { //tagのとき
          for (let book of books) {
            for (let tag of book.tags) {
              if (tag.name.toLowerCase().includes(query.replace('#', '').toLowerCase())) {
                tmpResults.push(book);
              }
            }
          }
          results = Array.from(new Set(tmpResults)); //配列の重複を取り除く
        } else { //titleのとき
          results = [];
          for (let book of books) {
            if (book.title.toLowerCase().includes(query.toLowerCase())) {
              results.push(book);
            }
          }
          books = results; //今回の検索結果を次の検索対象にする(and検索)
        }
      }
    }
    console.log(results);
    this.props.setBooks(results);
  }

  renderCancelButton = () => {
    const cancelButton = this.state.searching
      ? <Button style={styles.button}
        onPress={this.cancelSearch}
        title='キャンセル' />
      : <View />

    return cancelButton;
  }

  render() {
    cancelButton = this.renderCancelButton();

    return (
      <View style={styles.container}>
        <TextInput style={styles.input}
          onChangeText={(text) => this.startSearch(text)}
          value={this.state.searchText}
          placeholder='検索' />
        {cancelButton}
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.05,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#cbd2d9',
  },
  input: {
    flex: 8,
  },
  button: {
    flex: 2,
  },
});
