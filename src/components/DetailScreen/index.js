import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';

import { index as styles } from './Styles';
import TagsList from './TagsList';
import BookImage from './BookImage';
import StatusIcon from './StatusIcon';
import LendingButton from './LendingButton';

class DetailScreen extends Component {
  render() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    const { tags, status, image } = this.props.navigation.state.params.book;

    return (
      <View style={styles.container}>
        <BookImage uri={image} />
        <View style={styles.mainContainer}>
          <TagsList tags={tags} />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{params.book.title}</Text>
            <Text style={styles.date}>出版日：{params.book.published_at}</Text>
          </View>
          <View style={styles.statusContainer}>
            <StatusIcon status={status} />
            <LendingButton
              status={status}
              navigate={navigate}
            />
          </View>
        </View>
      </View>
    );
  }
}

DetailScreen.navigationOptions = {
  title: '詳細',
};

export default DetailScreen;
