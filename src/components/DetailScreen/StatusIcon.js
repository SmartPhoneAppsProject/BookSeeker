import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import {
  Octicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

import { statusIcon as styles } from './Styles';

const StatusIcon = ({ status }) => {
  if (status === true) {
    return (
      <View style={[styles.base, styles.status]}>
        <Octicons name="circle-slash" size={40} color="#cd5c5c" />
      </View>
    );
  }

  return (
    <View style={[styles.base, styles.status]}>
      <MaterialCommunityIcons name="check-circle-outline" size={40} color="#2e8b57" />
    </View>
  );
};

StatusIcon.propTyles = {
  status: PropTypes.bool.isRequired,
};

export default StatusIcon;
