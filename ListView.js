import React, { Component } from 'react';
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  View,
  Text,
  Image,
  Dimensions
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { List, ListItem } from 'react-native-elements';
import {
  MaterialCommunityIcons,
  Octicons
} from '@expo/vector-icons';

import {
  IconRuby
} from './icons';

export default class ListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  renderTags(tags) {
    return tags.map(tag => <View key={tag.id}><Text><IconRuby size={14} />{tag.name}</Text></View>);
  }
  _renderItem = ({ item }) => {
    const { navigate } = this.props.navigation;
    const status = item.status
      ? <MaterialCommunityIcons name='check-circle-outline' size={25} color='#2e8b57' />
      : <Octicons name='circle-slash' size={25} color='#cd5c5c' />;
    const tags = this.renderTags(item.tags);
    return (
      <ListItem
        onPress={() => navigate('Detail', { item })}
        title={item.title}
        subtitle={
          <View style={styles.tagsContainer}>
            {tags}
          </View>
        }
        subtitleNumberOfLines={1}
        badge={{ element: status }}
      />
    );
  }

  render() {
    return (
      <List style={styles.container}>
        <FlatList
          data={this.props.books}
          // keyExtractor={item => item.id}
          // ListHeaderComponent={this.renderHeader}
          // extraData={this.state.searchResult.contacts}
          renderItem={this._renderItem}
        />
      </List >
    );
  }
}

const { width } = Dimensions.get('window');
const imageSide = 70;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  itemContainer: {
    flexDirection: 'row',
    borderColor: '#CCC',
    borderWidth: 1,
  },
  image: {
    width: imageSide,
    height: imageSide,
  },
  item: {
    width: width - imageSide,
    height: imageSide,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  statusOk: {
    width: 90,
    fontSize: 15,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'green',
    overflow: 'hidden',
    textAlign: 'center',
  },
  statusNo: {
    width: 90,
    fontSize: 15,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'red',
    overflow: 'hidden',
    textAlign: 'center',
  },
  title: {
    flex: 2,
    fontSize: 30,
    textAlign: 'center',
  },
  tagsContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 5,
  },
  tag: {
    marginLeft: 5,
    backgroundColor: '#f5f5f5',
    borderColor: '#f5f5f5',
    borderRadius: 3,
    borderWidth: 1,
    overflow: 'hidden',
  },
});