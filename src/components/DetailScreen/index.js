import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import { index as styles } from './Styles';
import BookImage from './BookImage';
import TagsList from './TagsList';
import BookInfo from './BookInfo';
import BorrowReturnButton from './BorrowReturnButton';

class DetailScreen extends Component {
  render() {
    const { navigate } = this.props.navigation;
    const {
      tags,
      status,
      image,
      title,
      published,
    } = this.props.book;

    return (
      <View style={styles.container}>
        <BookImage uri={image} />
        <View style={styles.body}>
          <TagsList tags={tags} />
          <BookInfo
            title={title}
            published={published}
            tags={tags}
          />
          <BorrowReturnButton
            status={status}
            navigate={navigate}
          />
        </View>
      </View>
    );
  }
}

DetailScreen.navigationOptions = {
  title: '詳細',
};

DetailScreen.propTypes = {
  book: PropTypes.shape({
    tags: PropTypes.array.isRequired,
    status: PropTypes.bool.isRequired,
    image: PropTypes.string,
    title: PropTypes.string.isRequired,
    published: PropTypes.string.isRequired,
  }).isRequired,
};

export default DetailScreen;
