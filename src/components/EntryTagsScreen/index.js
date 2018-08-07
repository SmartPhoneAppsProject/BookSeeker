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
  componentDidMount() {
    this.props.getAllTags();
  }

  buttonOnPress = () => {
    const {
      title,
      image,
      published,
      isbn,
      tags,
      navigation,
    } = this.props;

    const chosenIds = tags.reduce((accumulator, current) => {
      if (current.chosen) {
        accumulator.push(current.id);
      }
      return accumulator;
    }, []);

    const body = JSON.stringify({
      title,
      image,
      published,
      isbn,
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

  renderTagsList = () => {
    const { tags } = this.props;

    return (
      <FlatList
        style={styles.listContainer}
        keyExtractor={item => item.id}
        data={tags}
        extraData={tags}
        renderItem={this.renderListItem}
      />
    );
  }

  renderListItem = ({ item }) => {
    const status = item.chosen
      ? <MaterialCommunityIcons name="check-circle-outline" size={25} color="#2e8b57" />
      : <View />;

    return (
      <ListItem
        containerStyle={styles.listItemContainer}
        onPress={() => this.props.toggleChosenFromId(item.id)}
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
    const { isLoading } = this.props;
    const tags = this.renderTagsList();
    const button = this.renderButton();
    if (isLoading) {
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
  tags: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    chosen: PropTypes.bool,
  })).isRequired,
  title: PropTypes.string.isRequired,
  isbn: PropTypes.string.isRequired,
  published: PropTypes.string.isRequired,
  image: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  getAllTags: PropTypes.func.isRequired,
  toggleChosenFromId: PropTypes.func.isRequired,
};

EntryTagsScreen.defaultProps = {
  image: '',
};
