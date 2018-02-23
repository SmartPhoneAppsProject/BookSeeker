import React, { Component } from 'react';
import { StyleSheet, TextInput, View, Text, Image, Button } from 'react-native';

export default class EntryScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      tags: '',
      photo: false,
    };
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.imageSection}>
          {this.state.photo
            ? <Image
              source={{ uri: 'https://facebook.github.io/react/logo-og.png' }}
            />
            : <Button
              onPress={() => navigate('Camera')}
              title='Camera'
            />
          }
        </View>
        <View style={styles.titleSection}>
          <Text>Title</Text>
          <TextInput
            onChangeText={(text) => this.setState({ title })}
            value={this.state.text}
          />
        </View>
        <View style={styles.tagSection}>
          <Text>Tag</Text>
          <TextInput
            onChangeText={(text) => this.setState({ title })}
            value={this.state.text}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  imageSection: {
    flex: 1,
  },
  image: {
    width: 30,
    height: 30,
  },
  titleSection: {
    flex: 1,
  },
  title: {
    flex: 1,
  },
  tagSection: {
    flex: 1,
  },
  tags: {
    flex: 1,
  },
});