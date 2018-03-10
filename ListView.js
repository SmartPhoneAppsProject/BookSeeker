import React, { Component } from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
} from 'react-native';
import {
  List,
  ListItem
} from 'react-native-elements';
import {
  MaterialCommunityIcons,
  Octicons
} from '@expo/vector-icons';

import SearchScreen from './SearchScreen';
import { getData } from './networking';
import {
  icon,
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
    let formated = [];
    let tag;
    for (i in tags) {
      if (i < 3) {
        tag = <Text style={styles.tagText}>{icon(tags[i].name)}{tags[i].name}</Text>;
      } else if (i == 3) {
        tag = <Text style={styles.tagText}>...</Text>;
      } else if (i > 3) {
        tag = <View/>;
      }

      formated.push(
        <View
          style={styles.subtitleView}
          key={tags[i].id}
        >
          {tag}
        </View>
      );
    }

    return <View
      style={styles.tagsContainer}>
      {formated}
    </View>;
  }

  _onRefresh = () => {
    this.setState({ onRefresh: true });

    getData()
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
      ? <MaterialCommunityIcons name='check-circle-outline' size={25} color='#2e8b57'/>
      : <Octicons name='circle-slash' size={25} color='#cd5c5c'/>;

    const tags = this.renderTags(item.tags);

    return (
      <ListItem
        chevronColor='#c0c0c0'
        onPress={() => navigate('Detail', { item })}
        title={item.title}
        subtitle={
          tags
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
      </List>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
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