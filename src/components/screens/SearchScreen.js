import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {
  Input,
  Button,
} from 'react-native-elements';

export default class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searching: false,
      searchText: '',
      books: this.props.books,
    };
  }

  startSearch = async (text) => {
    this.setState({
      searching: true,
      searchText: text,
    });
    const results = await this.search(text);
    this.props.setBooks(results);
  };

  cancelSearch = () => {
    this.setState({
      searching: false,
      searchText: '',
    });
    this.props.resetBooks();
  };

  search = async (text) => {
    const queries = text.split(' ');
    let books = this.state.books;
    let results = [];
    let tmpResults = [];

    for (let query of queries) {
      if (query) { //比較する文字列があるか
        if ('#' === query.charAt(0)) { //tagのとき
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
    return (results);
  };

  renderCancelButton = () => {
    const cancelButton = this.state.searching
      ? <View style={styles.buttonContainer}>
        <Button
          titleStyle={styles.buttonText}
          textStyle={styles.buttonText}
          buttonStyle={styles.button}
          onPress={this.cancelSearch}
          title='キャンセル'
          fontSize={10}
          color='#f5f5f5'
        />
      </View>
      : <View/>;

    return cancelButton;
  };

  render() {
    const cancelButton = this.renderCancelButton();

    return (
      <View style={styles.container}>
        <Input
          style={styles.input}
          containerStyle={styles.containerStyle}
          onChangeText={(text) => this.startSearch(text)}
          value={this.state.searchText}
          returnKeyType='done'
          placeholder='検索'
          placeholderTextColor='#f5f5f5'
          clearButtonMode='while-editing'
          leftIcon={<MaterialIcons name='search' size={13} color='#ffffff'/>}
          leftIconContainerStyle={styles.icon}
        />
        {cancelButton}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.05,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#c0c0c0',
    backgroundColor: '#c0c0c0',
    padding: 3,
  },
  icon: {
    margin: 3,
  },
  input: {
    flex: 8,
  },
  containerStyle: {
    height: 25,
    marginHorizontal: 5,
    backgroundColor: '#d3d3d3',
    borderColor: "#d3d3d3",
    borderWidth: 1,
    borderRadius: 20,
  },
  buttonContainer: {
    flex: 2,
  },
  buttonText: {
    fontWeight: '700',
    fontSize: 13,
    padding: 1,
  },
  button: {
    height: 25,
    backgroundColor: "#c0c0c0",
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5
  },
});
