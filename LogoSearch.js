import React, { Component } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default class LogoSearch extends Component {
  render() {
    const navigation = this.props.navigation;
    return (
      <TouchableOpacity style={styles.container}
        onPress={() => navigation.navigate('New')}>
        <MaterialIcons name='search' size={30} color='white' />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
});