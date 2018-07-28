import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {
  Button,
  ListItem,
} from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { index as styles } from './Styles';
import { icon } from '../../utils/Icons';
import API_ENDPOINT from '../../utils/endpoint';

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
    fetch(`${API_ENDPOINT}/api/v1/tags`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response);
      })
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
    const { navigation } = this.props;

    const body = JSON.stringify({
      title: this.props.title,
      image: this.props.image.base64,
      published: this.props.published,
      isbn: this.props.isbn,
      tag_ids: chosenIds,
      status: false,
    });

    fetch(`${API_ENDPOINT}/api/v1/books`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response);
      })
      .then((responseJson) => {
        navigation.navigate('Home');
      })
      .catch(e => console.error(e));
  };

  renderTagsList = () => (
    <FlatList
      style={styles.listContainer}
      keyExtractor={item => item.id}
      data={this.state.tags}
      extraData={this.state.updated}
      renderItem={this.renderListItem}
    />
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

EntryTagsScreen.propTypes = {
  title: PropTypes.string.isRequired,
  isbn: PropTypes.string.isRequired,
  published: PropTypes.string.isRequired,
  image: PropTypes.string,
};

EntryTagsScreen.defaultProps = {
  image: '',
};
