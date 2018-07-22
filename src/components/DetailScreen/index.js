import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
} from 'react-native';

import { index as styles } from './Styles';
import TagsList from './TagsList';
import BookImage from './BookImage';
import StatusIcon from './StatusIcon';
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
        <View style={styles.mainContainer}>
          <TagsList tags={tags} />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.date}>出版日：{published}</Text>
          </View>
          <View style={styles.statusContainer}>
            <StatusIcon status={status} />
            <BorrowReturnButton
              status={status}
              navigate={navigate}
            />
          </View>
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
