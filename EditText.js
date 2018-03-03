import React, { Component } from 'react';
import { StyleSheet, TextInput, View, Button } from 'react-native';

import ListView from './ListView';

export default class EditText extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      results: [],
    };

    this.search = this.search.bind(this);
  }

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
  search() {
    const queries = this.state.searchText.split(" ") //searchText 'j' => '', searchText 'jj' => 'j'
    let data = this.props.books;
    let results = [];

    for (i in queries) {
      if (queries[i]) { //比較する文字列があるか
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
        if ('#' != queries[i].charAt(0)) { //titleのとき
          results = [];
          for (j in data) {
            if (data[j].title.toLowerCase().includes(queries[i].toLowerCase())) {
              results.push(data[j]);
            }
          }
          data = results;
        }
      }
    }

    this.setState({ results });
  }

  searchTag() {
    const queries = this.state.searchText.split(" ") //searchText 'j' => '', searchText 'jj' => 'j'
    let data = this.props.books;
    let results = [];

    for (i in queries) {
      results = [];
      for (j in data) {
        for (k in data[j].tags) {
          if (queries[i] && data[j].tags[k].name.toLowerCase().includes(queries[i].toLowerCase())) {
            results.push(data[j]);
          }
        }
      }
      data = results;
    }

    this.setState({ results });
  }

  render() {
    return (
      <View>
        <TextInput
          placeholder="タグ検索"
          onChangeText={(searchText) => {
            this.setState({ searchText });
            this.search();
          }}
          value={this.state.searchText}
        />
        {/* <View style={styles.buttonView}>
          <Button style={styles.seachButton}
            onPress={() => this.seachStart(this.state.searchText)}
            title="検索"
          />
          <Button onPress={() => this.clickCancel()}
            title="キャンセル"
          />
        </View> */}

        <View style={{ backgroundColor: '#f08080', padding: 5 }}>
          <ListView style={{ flex: 1 }}
            books={this.state.results}
            navigation={this.props.navigation} />
        </View>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  buttonView: {
    flexDirection: "row",
  },
  seachButton: {
    width: 100,
    height: 40,
    backgroundColor: 'blue',

  },
  cancelButton: {
    width: 100,
    height: 40,
    backgroundColor: 'blue',
  }
});