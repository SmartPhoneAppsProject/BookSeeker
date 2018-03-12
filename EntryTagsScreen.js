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
        for (let tag of tags) {
          tag.chosen = false;
        }
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

  renderTagsList = () => {
    return (
      <List containerStyle={styles.listContainer}>
        <FlatList
          keyExtractor={(item) => item.id}
          data={this.state.tags}
          extraData={this.state.tags}
          renderItem={this._renderItem}
        />
      </List>
    );
  };

  _renderItem = ({ item, index }) => {
    const status = item.chosen
      ? <MaterialCommunityIcons name='check-circle-outline' size={25} color='#2e8b57'/>
      : <View/>;

    return (
      <ListItem
        onPress={() => {
          let { tags } = this.state;
          tags[index].chosen = !tags[index].chosen;
          this.setState({ tags });
          console.log(tags);
        }}
        title={` ${item.name}`}
        leftIcon={
          icon(item.name)
        }
        badge={{ element: status }}
        hideChevron={true}
      />
    );
  };

  renderButton = () => {
    return (
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
    );
  };

  render() {
    const tags = this.renderTagsList();
    const button = this.renderButton();
    if (this.state.appState == 'success') {
      return (
        <View style={styles.isLoading}>
          <ActivityIndicator/>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        {tags}
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
  listContainer: {
    flex: 9,
    marginTop: 0,
  },
  buttonContainer: {
    flex: 1,
  },
  formButton: {
    backgroundColor: '#c0c0c0',
    borderWidth: 0,
    borderRadius: 20,
  },
});