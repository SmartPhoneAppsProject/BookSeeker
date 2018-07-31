import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';

import { bookImage as styles } from './Styles';

const BookImage = ({ uri }) => (
  <Image
    style={styles.image}
    source={{ uri }}
  />
);

BookImage.propTypes = {
  uri: PropTypes.string,
};

BookImage.defaultProps = {
  uri: '',
};

export default BookImage;
