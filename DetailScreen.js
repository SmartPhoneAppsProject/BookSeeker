import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Button,
} from 'react-native';

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

    this.putData(false)
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);

      })
      .catch(error => {
        console.warn(error);
        this.putData(json)
          .then(response => response.json())
          .then(responseJson => {
            console.log(responseJson);
          })
          .catch(error => console.error(error));
      });
  }

  putData(status) {
    return new Promise((resolve, reject) => {
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

      fetch(request)
        .then(response => resolve(response));
    });
  }

  render() {
    const { params } = this.props.navigation.state;
    return (
      <View style={styles.container}>
        <View style={[styles.base, styles.imgContainer]}>
          <Image style={styles.img}
            source={{ uri: 'https://facebook.github.io/react/logo-og.png' }} />
          <View style={[styles.base, styles.tagContainer]}>
            <View style={styles.tagsContainer}>
              {params.item.tags.map(tag => <Text style={styles.tag} key={tag.id}>{tag.name}</Text>)}
            </View>
          </View>
        </View>
        <View style={[styles.base, styles.statusContainer]}>
          {this.state.currentStatus
            ? <Text style={[styles.status, styles.statusNo]}>貸し出し中</Text>
            : <Text style={[styles.status, styles.statusOk]}>貸し出OK</Text>
          }
        </View>
        <View style={[styles.base, styles.titleContainer]}>
          <Text style={styles.title}>{params.item.title}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoHead}>詳細情報</Text>
          <ScrollView style={styles.infoBody}>
            <Text>JANコード：{params.item.jan_code}</Text>
            <Text>出版日：{params.item.published_at}</Text>
            <Text>アプリへの追加日：{params.item.created_at}</Text>
          </ScrollView>
        </View>
        <View style={[styles.base, styles.buttonContainer]}>
          {this.state.currentStatus
            ? <Button title="返却" onPress={this._returnBook} />
            : <Button title="貸出" onPress={this._lendBook} />
          }
        </View>
      </View>
    );
  }
}

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
      flexDirection: 'row',
      marginTop: 20,
    },
  img:
    {
      height: 90,
      width: 90,
    },
  tagContainer:
    {
      height: 40,
      marginLeft: 40,
      marginTop: 30,
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
      marginTop: 20,
    },
  status:
    {
      borderWidth: 1,
      borderColor: '#999',
      borderRadius: 5,
      marginLeft: 40,
      marginRight: 30,
      paddingTop: 5,
      width: 100,
      height: 30,
      backgroundColor: '#ccc',
      textAlign: 'center',
      overflow: 'hidden',
    },
  statusOk:
    {
      color: '#008000',
      borderColor: '#008000'
    },
  statusNo:
    {
      color: '#ff0000',
      borderColor: '#ff0000'
    },
  titleContainer:
    {
      flex: 1,
    },
  title:
    {
      fontSize: 20,
    },
  infoContainer:
    {
      flex: 3,
      marginTop: 5,
      marginLeft: 25,
      marginRight: 25,
      marginBottom: 10,
    },
  infoHead:
    {
      fontSize: 18,
      marginTop: 5,
      marginLeft: 5,
      paddingTop: 3,
      paddingLeft: 5,
      height: 30,
      width: 200,
    },
  infoBody:
    {
      marginLeft: 20,
    },
  buttonContainer:
    {
      flex: 2,
    },
});
