import React, { Component } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class LogoEntry extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => navigation.navigate('Entry')}
      >
        <MaterialCommunityIcons name='book-plus' size={30} color='white'/>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
});