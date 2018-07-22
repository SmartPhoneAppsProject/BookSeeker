import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
} from 'react-native';

import { bookImage as styles } from './Styles';

const NoImage = () => (
  <Image
    style={styles.img}
    source={require('./../../../assets/no_image.png')}
  />
);

const NetworkImage = uri => (
  <Image
    style={styles.img}
    source={{ uri }}
  />
);

const BookImage = ({ uri }) => (
  <View style={[styles.base, styles.imgContainer]}>
    {uri ?
      <NetworkImage uri={uri} />
      : <NoImage />
    }
  </View>
);

BookImage.propTypes = {
  uri: PropTypes.string.isRequired,
};

export default BookImage;
