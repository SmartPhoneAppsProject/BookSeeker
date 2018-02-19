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
                <Text style={styles.tag}>タグ：{JSON.stringify(tags = params ? params.item.tags : null)}</Text>
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
            <Text style={ styles.title}>{JSON.stringify(title = params ? params.item.title : null)}</Text>
        </View>
        <View style={ styles.info }>
            <Text style={ styles.infoHead}>詳細情報</Text>
            <ScrollView style={ styles.infoContainer}>
                <Text>JANコード：{JSON.stringify(jan_code = params ? params.item.jan_code : null)}</Text>
                <Text>出版日：{JSON.stringify(published_at = params ? params.item.published_at : null)}</Text>
                <Text>アプリへの追加日：{JSON.stringify(created_at = params ? params.item.created_at : null)}</Text>
                <Text>情報の更新日：{JSON.stringify(updated_at = params ? params.item.updated_at : null)}</Text>
                <Text>この本に対するコメント〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜hogehoge</Text>
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
      },
  base:
      {
          justifyContent: 'center',
          alignItems: 'center',
      },
  imgContainer:
      {
          height: 100,
          flexDirection: 'row',
          marginTop: 10,
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
          flexDirection: 'row',
          height: 40,
          marginTop: 10,

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
          height: 40,
      },
  title:
      {
          fontSize: 20,
      },
  info:
      {
          flex: 1,
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
          marginTop: 5,
          marginLeft: 20,
      },
});
