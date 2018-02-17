import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class DetailBookView extends React.Component {
  static navigationOptions = {
    title: 'DetailBookView',
  };

  render() {
    const { params } = this.props.navigation.state;
    // const id = params ? params.item.key : null;
    return (
      <View >
        <Text>{JSON.stringify(id = params ? params.item.key : null)}</Text>
        <Text>{JSON.stringify(jan_code = params ? params.item.jan_code : null)}</Text>
        <Text>{JSON.stringify(published_at = params ? params.item.published_at : null)}</Text>
        <Text>{JSON.stringify(status = params ? params.item.status : null)}</Text>
        <Text>{JSON.stringify(tags = params ? params.item.tags : null)}</Text>
        <Text>{JSON.stringify(title = params ? params.item.params : null)}</Text>
        <Text>{JSON.stringify(updated_at = params ? params.item.updated_at : null)}</Text>
        <Text>{JSON.stringify(created_at = params ? params.item.created_at : null)}</Text>
      </View>
    );
  }
}
