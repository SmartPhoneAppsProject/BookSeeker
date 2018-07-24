import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {
  Button,
  List,
  ListItem,
} from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { index as styles } from './Styles';
import {
  getTags,
  tagLinkBook,
} from '../../utils/Network';
import { icon } from '../../utils/Icons';
import { navigate } from '../../utils/NavigationService';

export default class EntryTagsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appState: 'isLoading', // or error or success
      tags: [],
      chosenIds: [],
      updated: true,
    };
  }

  componentDidMount() {
    getTags()
      .then((tags) => {
        tags.map(tag => ({
          ...tag,
          chosen: false,
        }));
        this.setState({
          tags,
        });
      })
      .catch(e => console.error(e));
  }

  changeTagChosen = (tag, itemIndex) => {
    const { tags, chosenIds } = this.state;

    tags[itemIndex].chosen = !tags[itemIndex].chosen;

    if (tags[itemIndex].chosen) {
      chosenIds.push(tag.id);
    } else {
      const searchIndex = tags.indexOf(tag.id);
      chosenIds.splice(searchIndex, 1);
    }

    this.setState({
      tags,
      updated: !this.state.updated, // re-render BookList
      chosenIds,
    });
  };

  buttonOnPress = () => {
    const { chosenIds } = this.state;
    chosenIds.forEach(id => this.tagAssociateToBook(id));
  };

  tagAssociateToBook = (tagId) => {
    const { book } = this.props.navigation.state.params;

    const json = JSON.stringify({
      book_id: book.id,
      tag_id: tagId,
    });

    tagLinkBook(json)
      .then(response => response.json())
      .then((responseJson) => {
        console.log(responseJson);
      })
      .catch(e => console.error(e));

    navigate('Home');
  };

  renderTagsList = () => (
    <List containerStyle={styles.listContainer}>
      <FlatList
        keyExtractor={item => item.id}
        data={this.state.tags}
        extraData={this.state.updated}
        renderItem={this.renderListItem}
      />
    </List>
  );

  renderListItem = ({ item, index }) => {
    const status = item.chosen
      ? <MaterialCommunityIcons name="check-circle-outline" size={25} color="#2e8b57" />
      : <View />;

    return (
      <ListItem
        containerStyle={styles.listItemContainer}
        onPress={() => this.changeTagChosen(item, index)}
        title={` ${item.name}`}
        leftIcon={
          icon(item.name)
        }
        badge={{ element: status }}
        hideChevron
      />
    );
  };

  renderButton = () => (
    <Button
      containerStyle={styles.buttonContainer}
      buttonStyle={styles.formButton}
      title="submit"
      onPress={this.buttonOnPress}
      iconRight
      icon={
        <MaterialCommunityIcons
          name="arrow-right"
          size={15}
          color="#ffffff"
        />
      }
    />
  );

  render() {
    const tags = this.renderTagsList();
    const button = this.renderButton();
    if (this.state.appState === 'success') {
      return (
        <View style={styles.isLoading}>
          <ActivityIndicator />
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

EntryTagsScreen.navigationOptions = {
  title: 'タグ登録',
};

