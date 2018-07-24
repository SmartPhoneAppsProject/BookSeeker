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

const NetworkImage = ({ uri }) => (
  <Image
    style={{ width: 50, height: 50 }}
    source={{ uri }}
  />
);

const BookImage = ({ uri }) => (
  <View style={styles.container}>
    {uri ?
      <NetworkImage uri={uri} />
      : <NoImage />
    }
  </View>
);

BookImage.propTypes = {
  uri: PropTypes.string,
};

BookImage.defaultProps = {
  uri: '',
};

export default BookImage;
