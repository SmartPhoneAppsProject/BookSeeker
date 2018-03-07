import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import {
  Button,
} from 'react-native-elements';
import { MaterialCommunityIcons, MaterialIcons, FontAwesome, Octicons } from '@expo/vector-icons';

export default class DetailScreen extends React.Component {
  static navigationOptions = {
    title: 'DetailScreen',
  };

  constructor(props) {
    super(props);

    this.state = {
      currentStatus: this.props.navigation.state.params.item.status,
    };

    this._lendBook = this._lendBook.bind(this);
    this._returnBook = this._returnBook.bind(this);
    this.putData = this.putData.bind(this);
  }

  _lendBook() {
    this.setState({
      currentStatus: true
    });

    this.putData(true);
  }

  _returnBook() {
    this.setState({
      currentStatus: false
    });

    this.putData(false);
  }

  async putData(status) {
    const uri = 'https://go-api-staging.herokuapp.com/books';
    const headers = new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json'
    });
    const json = JSON.stringify({
      jan_code: this.props.navigation.state.params.item.jan_code,
      status: status
    });
    const options = {
      method: 'PUT',
      headers: headers,
      body: json
    };

    const request = new Request(uri, options);

    try {
      console.log('try put');

      const response = await fetch(request);
      console.log(response);
    } catch (error) {
      console.log('try put failed')
    }
  }

  render() {
    const { params } = this.props.navigation.state;
    return (
      <View style={styles.container}>

        <View style={[styles.base, styles.imgContainer]}>
          <Image style={styles.img}
            source={{ uri: params.item.image }} />
        </View>

        <View style={styles.mainContainer}>

          <View style={styles.head}>
            <View style={[styles.base, styles.titleContainer]}>
              <Text style={styles.title}>{params.item.title}</Text>
            </View>
            <View style={[styles.base, styles.infoContainer]}>
              <Text style={styles.infoHead} >出版日：{params.item.published_at}</Text>
            </View>
          </View>

          <View style={[styles.base, styles.tagContainer]}>
            <ScrollView horizontal={true} style={styles.tagsContainer}>
              {params.item.tags.map(tag => <Text style={styles.tag} key={tag.id}>{tag.name}</Text>)}
            </ScrollView>
          </View>

          <View style={styles.statusContainer}>
            <View style={[styles.base, styles.status]}>
              {this.state.currentStatus
                ? <Octicons
                  name='circle-slash'
                  size={40}
                  color='red'
                />
                : <MaterialCommunityIcons
                  name='check-circle-outline'
                  size={40}
                  color='green'
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
                    backgroundColor: 'red',
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
                    backgroundColor: 'green'
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
  head:
    {
      flex: 1,
      flexDirection: 'row',
    },
  titleContainer:
    {
      flex: 1,
    },
  title:
    {
      fontSize: 30,
    },
  infoContainer:
    {
      flex: 1,
    },
  infoHead:
    {
      fontSize: 20,
    },
  infoBody:
    {
      marginLeft: 20,
    },
  tagContainer:
    {
      flex: 1,
      margin: 10,
    },
  tag: {
    margin: 3,
    backgroundColor: '#f5f5f5',
    borderColor: '#f5f5f5',
    borderRadius: 4,
    borderWidth: 1,
    overflow: 'hidden',
  },
  statusContainer:
    {
      flex: 1,
      flexDirection: 'row',
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
  mainContainer:
    {
      flex: 1
    }
});
