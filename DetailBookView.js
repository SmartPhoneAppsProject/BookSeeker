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
            <Image style={styles.img}
                   source={{ uri: 'https://facebook.github.io/react/logo-og.png' }} />
            <View style={ [styles.base, styles.tagContainer] }>
                {/*タグの処理を別けてタグ名だけを取得するようにしなければいけないです。*/}
                <Text style={styles.tag}>タグ：{JSON.stringify(tags = params ? params.item.tags : null)}</Text>
            </View>
        </View>
        <View style={ [styles.base, styles.statusContainer] }>
            {params.item.status ?
                <Text style={ styles.status }>貸出OK</Text>
                : <Text style={ [styles.status, styles.statusColor] }>貸出OK</Text>
            }
            {params.item.status ?
                <Text style={ [styles.status, styles.statusColor] }>貸出中</Text>
                : <Text style={ styles.status }>貸出中</Text>
            }
        </View>
        <View style={ [styles.base, styles.titleContainer] }>
            <Text style={ styles.title}>{params.item.title}</Text>
        </View>
        <View style={ styles.infoContainer }>
            <Text style={ styles.infoHead}>詳細情報</Text>
            <ScrollView style={ styles.infoBody}>
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
  tag:
      {
          fontSize: 15,
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
          width: 60,
          height: 30,
          backgroundColor: '#ccc',
          textAlign: 'center',
          overflow: 'hidden',
      },
  statusColor:
      {
          color: '#ff0000',
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
  infoBody:
      {
          marginLeft: 20,
      },
});
