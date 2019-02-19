import React from 'react';
import PropTypes from 'prop-types';
import {
  FlatList,
  View,
  Text,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import {
  MaterialCommunityIcons,
  Octicons,
} from '@expo/vector-icons';

import { BookListStyles as styles } from './Styles';
import SearchScreen from './SearchView';
import { icon } from '../../utils/Icons';
import EmptyComponent from './EmptyComponent';

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
        key={`${tags[i].id}`}
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

const renderItem = (book, navigation) => {
  const status = book.status
    ? <Octicons name="circle-slash" size={25} color="#cd5c5c" />
    : <MaterialCommunityIcons name="check-circle-outline" size={25} color="#2e8b57" />;
  const { navigate } = navigation;

  return (
    <ListItem
      chevronColor="#c0c0c0"
      onPress={() => navigate('Detail', { book })}
      title={book.title}
      subtitle={renderTags(book.tags)}
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
    <FlatList
      style={styles.list}
      data={books}
      extraData={books}
      keyExtractor={item => `${item.id}`}
      renderItem={({ item }) => renderItem(item, navigation)}
      onRefresh={onRefresh}
      refreshing={isLoading}
      ListEmptyComponent={EmptyComponent}
    />
  );
};

BookList.propTypes = {
  books: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    status: PropTypes.bool.isRequired,
    jancode: PropTypes.string.isRequired,
  })),
  onRefresh: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

BookList.defaultProps = {
  books: [],
};

export default BookList;
