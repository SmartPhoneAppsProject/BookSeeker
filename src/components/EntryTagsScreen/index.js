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

export default class EntryTagsScreen extends Component {
  componentDidMount() {
    this.props.getAllTags();
  }

  buttonOnPress = () => {
    const {
      title,
      published,
      isbn,
      tags,
      postBook,
      navigation,
    } = this.props;
    const image = this.props.image.base;

    const chosenIds = tags.reduce((accumulator, current) => {
      if (current.chosen) {
        accumulator.push(current.id);
      }
      return accumulator;
    }, []);

    postBook(title, image, published, isbn, chosenIds);
    navigation.navigate('Home');
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
  image: PropTypes.shape({
    uri: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    exif: PropTypes.string,
    base64: PropTypes.string,
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
  getAllTags: PropTypes.func.isRequired,
  toggleChosenFromId: PropTypes.func.isRequired,
  postBook: PropTypes.func.isRequired,
};

