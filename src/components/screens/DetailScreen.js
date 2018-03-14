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
  Octicons
} from '@expo/vector-icons';

import { icon } from "../../modules/Icons";
import { rentBook } from '../../modules/Network';

export default class DetailScreen extends Component {
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
    rentBook(json)
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
      })
      .catch(error => {
        console.warn(error);
        rentBook(json)
          .then(response => response.json())
          .then(responseJson => {
            console.log(responseJson);
          })
          .catch(error => console.error(error));
      });
  };

  _renderImage = () => {
    let imageUri = this.props.navigation.state.params.item.image;
    if (imageUri === 'none') {
      imageUri = 'https://facebook.github.io/react/logo-og.png';
    }

    return (
      <View style={[styles.base, styles.imgContainer]}>
        <Image style={styles.img} source={{ uri: imageUri }}/>
      </View>
    )
  };

  _renderTags = () => {
    const tags = this.props.navigation.state.params.item.tags;

    let formated = [];
    let tag;
    for (tag of tags) {
      tag = <Text style={styles.tagText}>{icon(tag.name)}{tag.name}</Text>;
      formated.push(
        <View style={styles.tag} key={tag.key}>
          {tag}
        </View>
      )
    }

    return (
      <View style={[styles.base, styles.tagContainer]}>
        <ScrollView horizontal={true}>
          {formated}
        </ScrollView>
      </View>
    )
  };

  _renderIcon = () => {
    if (this.state.currentStatus === true) {
      return (
        <View style={[styles.base, styles.status]}>
          <Octicons name='circle-slash' size={40} color='#cd5c5c'/>
        </View>
      )
    } else {
      return (
        <View style={[styles.base, styles.status]}>
          <MaterialCommunityIcons name='check-circle-outline' size={40} color='#2e8b57'/>
        </View>
      )
    }
  };

  _renderButton = () => {
    if (this.state.currentStatus === true) {
      return (
        <View style={[styles.base, styles.buttonContainer]}>
          <Button
            icon={<MaterialCommunityIcons name='keyboard-return' size={30} color='white'/>}
            title="返却"
            titleStyle={{ fontWeight: "700" }}
            buttonStyle={{ width: 100, height: 60, backgroundColor: '#cd5c5c' }}
            iconContainerStyle={{ marginRight: 10 }}
            onPress={this._returnBook}/>
        </View>
      )
    } else {
      return (
        <View style={[styles.base, styles.buttonContainer]}>
          <Button
            icon={<MaterialCommunityIcons name='book-open-page-variant' size={30} color='white'/>}
            title="貸出"
            titleStyle={{ fontWeight: "700" }}
            buttonStyle={{ width: 100, height: 60, backgroundColor: '#2e8b57' }}
            iconContainerStyle={{ marginRight: 10 }}
            onPress={this._lendBook}
          />
        </View>
      )
    }
  };

  render() {
    const { params } = this.props.navigation.state;
    const renderImage = this._renderImage();
    const renderTags = this._renderTags();
    const renderIcon = this._renderIcon();
    const renderButton = this._renderButton();

    return (
      <View style={styles.container}>
        {renderImage}
        <View style={styles.mainContainer}>
          {renderTags}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{params.item.title}</Text>
            <Text style={styles.date}>出版日：{params.item.published_at}</Text>
          </View>
          <View style={styles.statusContainer}>
            {renderIcon}
            {renderButton}
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
  tagContainer:
    {
      flex: 0.5,
      margin: 10,
    },
  tag:
    {
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
  tagText:
    {
      paddingRight: 5,
      color: '#808080',
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
