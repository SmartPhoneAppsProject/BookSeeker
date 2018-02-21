import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class DetailBookView extends React.Component {
  // static navigationOptions = ({ navigation, navigationOptions }) => {
  //   const { params } = this.props.navigation.state;

  //   return {
  //     title: params ? params.otherParam : 'DetailBookView',
  //     headerStyle: {
  //       backgroundColor: navigationOptions.headerTintColor,
  //     },
  //     headerTintColor: navigationOptions.headerStyle.backgroundColor,
  //   };
  // };
  static navigationOptions = {
    title: 'DetailBookView',
  };

  render() {
    const { params } = this.props.navigation.state;
    return (
      <View style={ styles.container }>
        <View style={ [styles.base, styles.imgContainer] }>
            <Image style={styles.image}
                   source={{ uri: 'https://facebook.github.io/react/logo-og.png' }} />
            <View style={ [styles.base, styles.tagContainer] }>
                <Text style={styles.tag}>タグ：{params.item.tags}</Text>
            </View>
        </View>
        <View style={ [styles.base, styles.status] }>
            {params.item.status ?
                <Text style={ styles.statusInfo }>貸出OK</Text>
                : <Text style={ [styles.statusInfo, styles.statusColor] }>貸出OK</Text>
            }
            {params.item.status ?
                <Text style={ [styles.statusInfo, styles.statusColor] }>貸出中</Text>
                : <Text style={ styles.statusInfo }>貸出中</Text>
            }
        </View>
        <View style={ [styles.base, styles.titleContainer] }>
            <Text style={ styles.title}>{params.item.title}</Text>
        </View>
        <View style={ styles.info }>
            <Text style={ styles.infoHead}>詳細情報</Text>
            <ScrollView style={ styles.infoContainer}>
                <Text>JANコード：{params.item.jan_code}</Text>
                <Text>出版日：{params.item.published_at}</Text>
                <Text>アプリへの追加日：{params.item.created_at}</Text>
            </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:
      {
          flex: 1,
          backgroundColor: 'white',
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
  image:
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
  tag:
      {
          fontSize: 15,
      },
  status:
      {
          flex: 1,
          flexDirection: 'row',
          marginTop: 20,
      },
  statusInfo:
      {
          borderWidth: 1,
          borderColor: '#999',
          borderRadius: 5,
          marginLeft: 40,
          marginRight: 30,
          paddingTop: 5,
          width: 60,
          height: 30,
          backgroundColor: '#ccc',
          textAlign: 'center'
      },
  statusColor:
      {
          color: 'red',
      },
  titleContainer:
      {
          // height: 40,
          flex: 1,
      },
  title:
      {
          fontSize: 20,
      },
  info:
      {
          flex: 5,
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
  infoContainer:
      {
          marginLeft: 20,
      },
});
