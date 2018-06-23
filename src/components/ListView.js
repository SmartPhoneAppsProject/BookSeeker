import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
} from 'react-native';
import {
  List,
  ListItem,
} from 'react-native-elements';
import {
  MaterialCommunityIcons,
  Octicons,
} from '@expo/vector-icons';

import SearchScreen from './SearchView';
import { getBooks } from '../utils/Network';
import { icon } from '../utils/Icons';

export default class ListView extends Component {
  static propTypes = {
    books: PropTypes.arrayOf(PropTypes.object),
  };

  static defaultProps = {
    books: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      books: this.props.books,
    };
  }


  onRefresh = () => {
    this.setState({ refreshing: true });

    getBooks(
      (books) => {
        console.log('Success');
        this.setState({
          books,
          refreshing: false,
        });
      },
      (error) => {
        console.warn(error);
        this.setState({
          books: [],
          refreshing: false,
        });
      },
    );
  };

  // SearchViewからListViewを変更するためにstateとして受け渡す
  setBooks = (books) => {
    this.setState({ books });
  };

  resetBooks = () => {
    this.setState({ books: this.props.books });
  };

  renderTags = (tags) => {
    let formatted = [];
    let tag;
    for (let i = 0; i < tags.length; i++) {
      if (i < 2) {
        tag = <Text style={styles.tagText}>{icon(tags[i].name)}{tags[i].name}</Text>;
      } else if (i === 2) {
        tag = <Text style={styles.tagText}>{icon(tags[i].name)}{tags[i].name}...</Text>;
      } else {
        break;
      }

      formatted.push(
        <View
          style={styles.subtitleView}
          key={tags[i].id}
        >
          {tag}
        </View>
      );
    }

    return (
      <View
        style={styles.tagsContainer}
      >
        {formatted}
      </View>
    );
  };

  renderItem = ({ item }) => {
    const { navigate } = this.props.navigation;
    const status = item.status
      ? <Octicons name="circle-slash" size={25} color="#cd5c5c" />
      : <MaterialCommunityIcons name="check-circle-outline" size={25} color="#2e8b57" />;

    const tags = this.renderTags(item.tags);

    return (
      <ListItem
        chevronColor="#c0c0c0"
        onPress={() => navigate('Detail', { item })}
        title={item.title}
        subtitle={tags}
        subtitleNumberOfLines={1}
        badge={{ element: status }}
      />
    );
  };

  render() {
    return (
      <List
        containerStyle={styles.list}
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
          renderItem={this.renderItem}
          onRefresh={this.onRefresh}
          refreshing={this.state.refreshing}
        />
      </List>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    marginTop: 0,
    padding: 0,
  },
  tagsContainer: {
    flexDirection: 'row',
    paddingTop: 5,
    paddingLeft: 10,
  },
  subtitleView: {
    flexDirection: 'row',
  },
  tagText: {
    paddingRight: 5,
    color: '#808080',
  },
});
