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
  Button,
  List,
  ListItem,
} from 'react-native-elements';

import {
  getTags,
  tagLinkBook,
} from "../../utils/Network";
import { icon } from "../../utils/Icons";
import { goToHomeScreen } from "../../utils/Navigation";

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
      chosenIds: [],
      updated: true,
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
        console.warn(error);
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
            console.error(error)
          });
      });
  }

  renderTagsList = () => {
    return (
      <List containerStyle={styles.listContainer}>
        <FlatList
          keyExtractor={(item) => item.id}
          data={this.state.tags}
          extraData={this.state.updated}
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
        containerStyle={styles.listItemContainer}
        onPress={() => this.changeTagChosen(item, index)}
        title={` ${item.name}`}
        leftIcon={
          icon(item.name)
        }
        badge={{ element: status }}
        hideChevron={true}
      />
    );
  };

  changeTagChosen = (tag, itemIndex) => {
    let { tags, chosenIds } = this.state;

    tags[itemIndex].chosen = !tags[itemIndex].chosen;

    if (tags[itemIndex].chosen) {
      chosenIds.push(tag.id);
    } else {
      const searchIndex = tags.indexOf(tag.id);
      chosenIds.splice(searchIndex, 1);
    }

    this.setState({
      tags,
      updated: !this.state.updated, //re-render ListView
      chosenIds,
    });
  };

  renderButton = () => {
    return (
      <Button
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.formButton}
        title='submit'
        onPress={this.buttonOnPress}
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

  buttonOnPress = () => {
    for (let id of this.state.chosenIds) {
      this.tagAssociateToBook(id);
    }
  };

  tagAssociateToBook = (tagId) => {
    const { book } = this.props.navigation.state.params;
    console.warn(book.id);

    const json = JSON.stringify({
      book_id: book.id,
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

    goToHomeScreen();
  };

  render() {
    const tags = this.renderTagsList();
    const button = this.renderButton();
    if (this.state.appState === 'success') {
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

const
  styles = StyleSheet.create({
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
    listItemContainer: {
      margin: 10,
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