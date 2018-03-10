import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import {
  FormLabel,
  FormInput,
} from 'react-native-elements';

export default class EntryTagsScreen extends Component {
  static navigationOptions = {
    title: 'タグ登録',
  };

  constructor(props) {
    super(props);

    this.state = {
      tagText: '',
    };
  }

  tagChanged = (text) => {
    this.setState({ tagInput: text });
  }

  render() {
    return (
      <View style={styles.container}>
        <FormLabel>Tag</FormLabel>
        <FormInput
          onChangeText={(text) => this.tagChanged(text)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});