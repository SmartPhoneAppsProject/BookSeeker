import React from 'react';
import PropTypes from 'prop-types';
import {
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
import { icon } from '../../utils/Icons';
import { BookListStyles as styles } from './Styles';

const renderTags = (tags) => {
  const formatted = [];
  // tagが３つ以上のときtag1 tag2 tag3 ...
  for (let i = 0; i < tags.length; i += 1) {
    let tagName;
    if (i < 3) {
      tagName = <Text style={styles.tagText}>{icon(tags[i].name)}{tags[i].name}</Text>;
    } else if (i === 3) {
      tagName = <Text style={styles.tagText}>...</Text>;
    }

    const tag = (
      <View
        style={styles.subtitleView}
        key={tags[i].id}
      >
        {tagName}
      </View>
    );
    formatted.push(tag);
  }

  return (
    <View style={styles.tagsContainer}>{formatted}</View>
  );
};

const renderItem = (item, navigation) => {
  const status = item.status
    ? <Octicons name="circle-slash" size={25} color="#cd5c5c" />
    : <MaterialCommunityIcons name="check-circle-outline" size={25} color="#2e8b57" />;

  return (
    <ListItem
      chevronColor="#c0c0c0"
      onPress={() => navigation.navigate('Detail', { item })}
      title={item.title}
      subtitle={renderTags(item.tags)}
      subtitleNumberOfLines={1}
      badge={{ element: status }}
    />
  );
};

const BookList = (props) => {
  const {
    books,
    onRefresh,
    isLoading,
    navigation,
  } = props;

  return (
    <List
      containerStyle={styles.list}
    >
      <FlatList
        // ListHeaderComponent={
        //   <SearchScreen
        //     books={this.state.books}
        //     setBooks={this.setBooks}
        //     resetBooks={this.resetBooks}
        //   />
        // }
        data={books}
        extraData={books}
        keyExtractor={item => item.id}
        renderItem={({ item }) => renderItem(item, navigation)}
        onRefresh={onRefresh}
        refreshing={isLoading}
      />
    </List>
  );
};

BookList.propTypes = {
  books: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    status: PropTypes.bool.isRequired,
    isbn: PropTypes.string.isRequired,
  })),
  onRefresh: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

BookList.defaultProps = {
  books: [],
};

export default BookList;
