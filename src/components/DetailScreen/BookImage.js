import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
} from 'react-native';

import { bookImage as styles } from './Styles';

const BookImage = ({ uri }) => {
  let imageUri = uri;
  if (imageUri === 'none') {
    imageUri = 'https://facebook.github.io/react/logo-og.png';
  }

  return (
    <View style={[styles.base, styles.imgContainer]}>
      <Image style={styles.img} source={{ uri: imageUri }} />
    </View>
  );
};

BookImage.propTypes = {
  uri: PropTypes.string.isRequired,
};

export default BookImage;
