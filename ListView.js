import React, { Component } from 'react';
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  View,
  Text,
  Image,
  Dimensions
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import {
  List,
  ListItem
} from 'react-native-elements';
import {
  MaterialCommunityIcons,
  Octicons
} from '@expo/vector-icons';

import SearchScreen from './SearchScreen';
import reqBook from './reqBook';
import {
  IconAndroid
} from './icons';

export default class ListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      books: this.props.books
    };
  }

  setBooks = (books) => {
    this.setState({ books: books });
  }

  resetBooks = () => {
    this.setState({ books: this.props.books });
  }

  renderTags = (tags) => {
    return tags.map(tag =>
      <View
        style={styles.subtitleView}
        key={tag.id}
      >
        <Text style={styles.ratingText}><IconAndroid size={14} />{tag.name}</Text>
      </View>
    );
  }

  _onRefresh = () => {
    this.setState({ onRefresh: true });

    const bookSeeker = "https://go-api-staging.herokuapp.com/books";

    reqBook(bookSeeker)
      .then((books) => {
        console.log(books);
        if (!books) {
          this.setState({ books: '' });
        } else {
          this.setState({ books });
        }
      })
      .catch((error) => console.error(error));
  }

  _renderItem = ({ item }) => {
    const { navigate } = this.props.navigation;
    const status = item.status
      ? <MaterialCommunityIcons name='check-circle-outline' size={25} color='#2e8b57' />
      : <Octicons name='circle-slash' size={25} color='#cd5c5c' />;
    const tags = this.renderTags(item.tags);

    return (
      <ListItem
        chevronColor='#c0c0c0'
        onPress={() => navigate('Detail', { item })}
        title={item.title}
        subtitle={
          <View style={styles.tagsContainer}>
            {tags}
          </View>
        }
        subtitleNumberOfLines={1}
        badge={{ element: status }}
      />
    );
  }

  render() {
    return (
      <List
        containerStyle={{ marginTop: 0, padding: 0 }}
      >
        <FlatList
          ListHeaderComponent={
            <SearchScreen
              books={this.state.books}
              setBooks={this.setBooks}
              resetBooks={this.resetBooks}
            />
          }
          data={this.state.books}
          extraData={this.state.books}
          renderItem={this._renderItem}
          onRefresh={this._onRefresh}
          refreshing={this.state.refreshing}
        />
      </List >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5,
  },
  ratingText: {
    paddingLeft: 10,
    color: '#808080',
  },
});