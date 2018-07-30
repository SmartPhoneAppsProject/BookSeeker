import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
} from 'react-native';

import { bookImage as styles } from './Styles';

const BookImage = ({ uri }) => (
  <View style={styles.container}>
    <Image
      style={{ width: 50, height: 50 }}
      source={{ uri }}
    />
  </View>
);

BookImage.propTypes = {
  uri: PropTypes.string,
};

BookImage.defaultProps = {
  uri: '',
};

export default BookImage;
