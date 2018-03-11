import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  MaterialCommunityIcons,
  Octicons
} from '@expo/vector-icons';
import {
  FormLabel, FormInput
} from 'react-native-elements';
import {
  getTags,
  tagLinkBook,
} from "./networking";

export default class EntryTagsScreen extends Component {
  static navigationOptions = {
    title: 'タグ登録',
  };

  constructor(props) {
    super(props);
    this.state = {
      tagText: '',
      isLoading: true,
      tags: [],
    };
  }

  componentDidMount() {
    getTags()
      .then((tags) => {
        this.setState({
          isLoading: false,
          tags,
        });
      })
      .catch(error => {
        console.warn(error)
      });
  }

  _onChangeText = (text) => {
    console.log(text);
    this.setState({ tagText: text });
  };

  tagsAssociateToBook = (tagId) => {
    const { params } = this.props.navigation.state;

    const json = JSON.stringify({
      book_id: params.id,
      tag_id: tagId
    });

    tagLinkBook(json)
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);

      })
      .catch(error => {
        console.warn(error);
        tagLinkBook(json)
          .then(response => response.json())
          .then(responseJson => {
            console.log(responseJson);
          })
          .catch(error => console.error(error));
      });
  };

  renderTags = () => {
    let tags = [];
    this.state.tags.map(tag => {
      tags.push(<Text style={styles.tag} key={tag.id}>
          {tag.name}
        </Text>
      );
    });
    return tags;
  };

  renderForm = () => {
    return (
      <View style={styles.childContainer}>
        <Text style={styles.tag}>タグ</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this._onChangeText(text)}
          value={this.state.tagText}
          returnKeyType='done'
          placeholder='tag'
          autoFocus={true}
          maxLength={20}
        />
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
    const tags = this.renderTags();
    const form = this.renderForm();
    const button = this.renderButton();
    if (this.state.isLoading) {
      return (
        <View style={styles.isLoading}>
          <ActivityIndicator/>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        {tags}
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
  isLoading: {
    flex: 1,
    paddingTop: 20
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