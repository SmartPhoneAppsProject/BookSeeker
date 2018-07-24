import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
} from 'react-native';

import { bookInfo as styles } from './Styles';

const BookInfo = ({ title, published }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.date}>出版日：{published}</Text>
  </View>
);

BookInfo.propTypes = {
  title: PropTypes.string.isRequired,
  published: PropTypes.string.isRequired,
};

export default BookInfo;
