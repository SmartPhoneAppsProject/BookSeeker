import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {
  MaterialCommunityIcons,
  Octicons
} from '@expo/vector-icons';
import {
  Input,
  Button,
  List,
  ListItem,
} from 'react-native-elements';

import {
  getTags,
  tagLinkBook,
} from "./networking";
import { icon } from "./icons";

export default class EntryTagsScreen extends Component {
  static navigationOptions = {
    title: 'タグ登録',
  };

  constructor(props) {
    super(props);
    this.state = {
      tagText: '',
      appState: 'isLoading', // or error or success
      tags: [],
      validation: false,
      errorMessage: ' ',
    };
  }

  componentDidMount() {
    getTags()
      .then((tags) => {
        this.setState({
          appStatue: 'success',
          tags,
        });
      })
      .catch(error => {
        console.warn(error)
      });
  }

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


  renderForm = () => {
    return (
      <View style={styles.form}>
        <Input
          containerStyle={styles.formInput}
          leftIcon={
            <MaterialCommunityIcons
              name='tag'
              size={15}
              color='#808080'
            />
          }
          onChangeText={(text) => this._onChangeText(text)}
          value={this.state.tagText}
          returnKeyType='done'
          placeholder='tag'
          autoFocus={true}
          shake={this.state.validation}
          displayError={true}
          errorStyle={{ color: '#cd5c5c' }}
          errorMessage={this.state.errorMessage}
          maxLength={20}
        />
        <Button
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.formButton}
          text='submit'
          onPress={() => console.log('onPress')}
          iconRight={true}
          icon={
            <MaterialCommunityIcons
              name='arrow-right'
              size={15}
              color='#ffffff'
            />
          }
        />
      </View>
    );
  };

  _onChangeText = (text) => {
    console.log(text);
    this.setState({
      tagText: text,
      validation: false,
      errorMessage: ' ',
    });

    if (!text) {
      this.setState({
        validation: true,
        errorMessage: '無効な値です'
      });
    }
  };

  renderTagsList() {
    return (
      <List containerStyle={styles.list}>
        <FlatList
          keyExtractor={(item) => item.id}
          data={this.state.tags}
          extraData={this.state.tags}
          renderItem={this._renderItem}
        />
      </List>
    );
  }

  _renderItem = ({ item }) => {
    return (
      <ListItem
        onPress={() => console.log(item.id)}
        title={` ${item.name}`}
        leftIcon={
          icon(item.name)
        }
        hideChevron={true}
      />
    );
  };

  render() {
    const tags = this.renderTagsList();
    const form = this.renderForm();
    if (this.state.appState == 'success') {
      return (
        <View style={styles.isLoading}>
          <ActivityIndicator/>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        {form}
        {tags}
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
  form: {
    flex: 1,
    flexDirection: 'row',
    margin: 5,
  },
  formInput: {
    flex: 8,
  },
  buttonContainer: {
    flex: 2,
    height: 35,
  },
  formButton: {
    backgroundColor: '#c0c0c0',
    borderWidth: 0,
    borderRadius: 20,
  },
  list: {
    flex: 9,
  }
});