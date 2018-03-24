import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { navigate } from '../utils/NavigationService';

export const LogoEntry = () => (
  <TouchableOpacity
    style={styles.container}
    onPress={() => navigate('Entry')}
  >
    <MaterialCommunityIcons name="book-plus" size={30} color="white" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
});

export { LogoEntry as default };
