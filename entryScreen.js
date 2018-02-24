import React, { Component } from 'react';
import { StyleSheet, TextInput, View, Text, Image, Button, Dimensions } from 'react-native';

export default class EntryScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      tags: '',
      photo: false,
    };
  }

  returnData(data) {
    this.setState({ photo: data });
  }

  renderPhotoSection() {
    const photo = this.state.photo
      ? <Image style={styles.photo} source={{ uri: this.state.photo.uri }} />
      : null;
    return (
      <View style={styles.photoSection} >
        {photo}
        <Button style={styles.takePhoto}
          onPress={() => this.props.navigation.navigate('Camera', { returnData: this.returnData.bind(this) })}
          title='Camera' />
      </View>
    );
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        {this.renderPhotoSection()}
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

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
  },
  photoSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  photo: {
    width: width / 3,
    height: (4 / 3 * width) / 3,
    alignSelf: 'center',
  },
  takePhoto: {
    flex: 1,
    alignSelf: 'center',
  },
  titleSection: {
    flex: 1,
  },
  title: {
    flex: 1,
  },
  tagSection: {
    flex: 1,
    justifyContent: 'center',
  },
  tags: {
    flex: 1,
  },
});