import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  ScrollView,
} from 'react-native';

import { icon } from '../../utils/Icons';
import { tagsList as styles } from './Styles';

const TagsList = ({ tags }) => {
  const formatted = [];

  for (let i = 0; i < tags.length; i += 1) {
    const container = (
      <View
        style={styles.tag}
        key={tags[i].id}
      >
        <Text style={styles.tagText}>
          {icon(tags[i].name)}{tags[i].name}
        </Text>
      </View>
    );

    formatted.push(container);
  }

  return (
    <View style={styles.tagContainer}>
      <ScrollView horizontal>
        {formatted}
      </ScrollView>
    </View>
  );
};

TagsList.propTyles = {
  tags: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })),
};

export default TagsList;
