import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';

import {
  Button,
} from 'react-native-elements';

import {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome,
  Octicons
} from '@expo/vector-icons';

import { putData } from './networking';

export default class DetailScreen extends React.Component {
  static navigationOptions = {
    title: 'DetailScreen',
  };

  constructor(props) {
    super(props);

    this.state = {
      currentStatus: this.props.navigation.state.params.item.status
    };

    this._lendBook = this._lendBook.bind(this);
    this._returnBook = this._returnBook.bind(this);
  }

  _lendBook = () => {
    this.setState({
      currentStatus: true
    });

    const json = JSON.stringify({
      jan_code: this.props.navigation.state.params.item.jan_code,
      status: true
    });

    this.changeBookStatus(json);
  };

  _returnBook = () => {
    this.setState({
      currentStatus: false
    });

    const json = JSON.stringify({
      jan_code: this.props.navigation.state.params.item.jan_code,
      status: false
    });

    this.changeBookStatus(json);
  };

  changeBookStatus = (json) => {
    putData(json)
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);

      })
      .catch(error => {
        console.warn(error);
        putData(json)
          .then(response => response.json())
          .then(responseJson => {
            console.log(responseJson);
          })
          .catch(error => console.error(error));
      });
  };

  render() {
    const { params } = this.props.navigation.state;
    return (
      <View style={styles.container}>

        <View style={[styles.base, styles.imgContainer]}>
          <Image style={styles.img}
            source={{ uri: params.item.image }} />
        </View>

        <View style={styles.mainContainer}>
          <View style={[styles.base, styles.tagContainer]}>
            <ScrollView horizontal={true} style={styles.tagsContainer}>
              {params.item.tags.map(tag => <Text style={styles.tag} key={tag.id}>{tag.name}</Text>)}
            </ScrollView>
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.title}>{params.item.title}</Text>
            <Text style={styles.date} >出版日：{params.item.published_at}</Text>
          </View>

          <View style={styles.statusContainer}>
            <View style={[styles.base, styles.status]}>
              {this.state.currentStatus
                ? <Octicons
                  name='circle-slash'
                  size={40}
                  color='#cd5c5c'
                />
                : <MaterialCommunityIcons
                  name='check-circle-outline'
                  size={40}
                  color='#2e8b57'
                />
              }
            </View>

            <View style={[styles.base, styles.buttonContainer]}>
              {this.state.currentStatus
                ? <Button
                  icon={
                    <MaterialCommunityIcons
                      name='keyboard-return'
                      size={30}
                      color='white'
                    />
                  }
                  text="返却"
                  textStyle={{ fontWeight: "700" }}
                  buttonStyle={{
                    width: 100,
                    height: 60,
                    backgroundColor: '#cd5c5c',
                  }}
                  iconContainerStyle={{
                    marginRight: 10,
                  }}
                  onPress={this._returnBook}
                />
                : <Button
                  icon={
                    <MaterialCommunityIcons
                      name='book-open-page-variant'
                      size={30}
                      color='white'
                    />
                  }
                  text="貸出"
                  textStyle={{ fontWeight: "700" }}
                  buttonStyle={{
                    width: 100,
                    height: 60,
                    backgroundColor: '#2e8b57'
                  }}
                  iconContainerStyle={{
                    marginRight: 10,
                  }}
                  onPress={this._lendBook}
                />
              }
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container:
    {
      flex: 1,
      backgroundColor: '#fff',
    },
  base:
    {
      justifyContent: 'center',
      alignItems: 'center',
    },
  imgContainer:
    {
      flex: 1,
    },
  img:
    {
      height: 300,
      width: width,
    },
  mainContainer:
    {
      flex: 1
    },
  titleContainer:
    {
      flex: 1,
      justifyContent: 'center',
      marginLeft: 50,
    },
  title:
    {
      fontSize: 20,
      marginBottom: 10,
    },
  dateContainer:
    {
      flex: 0.4,
    },
  date:
    {
      fontSize: 14,
      color: '#6E6E6E',
    },
  tagContainer:
    {
      flex: 0.5,
      margin: 10,
    },
  tag: {
    margin: 3,
    backgroundColor: '#f5f5f5',
    borderColor: '#f5f5f5',
    borderRadius: 4,
    borderWidth: 1,
    overflow: 'hidden',
    paddingRight: 8,
    paddingLeft: 8,
    paddingTop: 13,
  },
  statusContainer:
    {
      flex: 1,
      flexDirection: 'row',
      marginBottom: 15,
    },
  status:
    {
      flex: 1,
    },
  buttonContainer:
    {
      flex: 1,
    },
  button:
    {
      width: 70,
    },
});
