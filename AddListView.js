import React, { Component } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, View, Text, Image, Dimensions } from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class AddListView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <FlatList
        data={this.props.books}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity style={styles.itemContainer}
              onPress={() => navigate('Detail', { item })} >
              <Image style={styles.image}
                source={{ uri: item.image }} />
              <View style={styles.item}>
                {item.status
                  ? <Text style={styles.statusNo}>貸し出し中</Text>
                  : <Text style={styles.statusOk}>貸し出しOK</Text>
                }
                <Text style={styles.title}>{item.title}</Text>
                <View style={styles.tagsContainer}>
                  {item.tags.map(tag => <Text style={styles.tag} key={tag.id}>{tag.name}</Text>)}
                </View>
              </View>
            </TouchableOpacity >
          );
        }}
      />
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
  },
  tag: {
    marginLeft: 5,
    backgroundColor: '#f5f5f5',
    borderColor: '#f5f5f5',
    borderRadius: 4,
    borderWidth: 1,
    overflow: 'hidden',
  },
});