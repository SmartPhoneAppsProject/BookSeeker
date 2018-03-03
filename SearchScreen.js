import React, { Component } from 'react';
import { StyleSheet, TextInput, View, Button } from 'react-native';

import ListView from './ListView';

export default class SearchScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searching: false,
      searchText: '',
      tmpBooks: this.props.tmpBooks,
      books: this.props.books,
    };

    this.search = this.search.bind(this);
  }

  search() {
    console.log(this.props.books);
    const queries = this.state.searchText.split(' ') //searchText 'j' => '', searchText 'jj' => 'j'
    let data = this.props.books;
    let results = [];

    for (i in queries) {
      if (queries[i]) { //比較する文字列があるか
        if ('#' != queries[i].charAt(0)) { //titleのとき
          results = [];
          for (j in data) {
            if (data[j].title.toLowerCase().includes(queries[i].toLowerCase())) {
              results.push(data[j]);
            }
          }
          data = results;
        }
        // if ('#' == queries[i].charAt(0)) { //tagのとき
        //   for (j in data) {
        //     results = [];
        //     for (k in data[j].tags) {
        //       if (data[j].tags[k].name.toLowerCase().includes(queries[i].replace('#', '').toLowerCase())) {
        //         results.push(data[j]);
        //       }
        //     }
        //     data = results;
        //   }
        // }
      }
    }

    this.setState({ books: results });
    this.props.setBooksOnList(results);
  }

  cancel() {
    this.setState({ searchText: '' });
    this.props.setBooksOnList(this.props.books)
  }

  render() {
    const cancelButton = this.state.searching
      ? <Button style={styles.button}
        onPress={() => {
          this.setState({ searching: false })
          this.cancel();
        }}
        title='キャンセル' />
      : <View />
    return (
      <View style={styles.container}>
        <TextInput style={styles.input}
          onChangeText={(searchText) => {
            this.setState({ searchText, searching: true });
            this.search();
          }}
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
  },
  input: {
    flex: 8,
  },
  button: {
    flex: 2,
  },
});

  //title or
  // for(i in queries){
  //   for(j in data){
  //     if(data[j].title.toLowerCase().includes(queries[i].toLowerCase())){
  //       results.push(data[j]);
  //     }
  //   }
  // }

  //tag or
  // for(i in queries){
  //   for(j in data){
  //     for(k in data[j].tags) {
  //       if(data[j].tags[k].toLowerCase().includes(queries[i].toLowerCase())){
  //         results.push(data[j].tags[k]);
  //       }
  //     }
  //   }
  // }