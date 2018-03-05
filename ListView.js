import React, { Component } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, View, Text, Image, Dimensions } from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class ListView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <FlatList style={list.container}
        data={this.props.books}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity style={list.item}
              onPress={() => navigate('Detail', { item })} >
              <Image style={list.image}
                source={{ uri: item.image }} />
              <View style={list.info}>
                <View style={list.infoStatus}>
                  {item.status ? <Text style={list.statusOk}>貸し出しOK</Text>
                    : <Text style={list.statusNo}>貸し出し中</Text>}
                </View>
                <Text style={list.infoTitle}>{item.title}</Text>
              </View>
            </TouchableOpacity >
          );
        }}
      />
    );
  }
}

const { width } = Dimensions.get('window');

const list = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    borderColor: '#CCC',
    borderWidth: 1,
  },
  image: {
    width: 64,
    height: 64,
  },
  info: {
    width: width - 64,
    height: 64,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  infoStatus: {
    flex: 1,
    flexDirection: 'row',
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
  infoTitle: {
    flex: 2,
    fontSize: 30,
    textAlign: 'center',
  }
});