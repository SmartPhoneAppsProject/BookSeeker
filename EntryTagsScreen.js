import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text, TouchableOpacity,
} from 'react-native';
import {
  MaterialCommunityIcons,
  Octicons
} from '@expo/vector-icons';
import {
  FormLabel,
  FormInput
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
    console.log(text);
    this.setState({ tagText: text });
  };

  renderForm = () => {
    return (
      <View style={styles.childContainer}>
        <Text style={styles.tag}>タグ</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.tagChanged(text)}
          value={this.state.tagText}
          returnKeyType='done'
          placeholder='tag'
          maxLength={20}
        />
        {/*<FormLabel>Tag</FormLabel>*/}
        {/*<FormInput*/}
        {/*onChangeText={(text) => this.tagChanged(text)}*/}
        {/*/>*/}
      </View>
    );
  };

  renderButton = () => {
    return (
      <View style={styles.childContainer}>
        <TouchableOpacity
          style={styles.buttonContainer}
        >
          <Text style={styles.buttonText}>submit</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const form = this.renderForm();
    const button = this.renderButton();
    return (
      <View style={styles.container}>
        {form}
        {button}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  childContainer: {
    flex: 1,
    padding: 20,
  },
  tag: {
    alignSelf: 'stretch',
    marginBottom: 10,
    padding: 10,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 10,
    padding: 10,
  },
  buttonContainer: {
    backgroundColor: '#2980b6',
    paddingVertical: 15,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
});