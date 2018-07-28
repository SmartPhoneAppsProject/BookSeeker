import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { navigate } from '../../utils/NavigationService';

import { LogoEntry as styles } from './Styles';

const LogoEntry = () => (
  <TouchableOpacity
    style={styles.container}
    onPress={() => navigate('Entry')}
  >
    <MaterialCommunityIcons name="book-plus" size={30} color="white" />
  </TouchableOpacity>
);

export default LogoEntry;
