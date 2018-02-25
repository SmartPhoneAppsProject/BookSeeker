import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import PTRView from 'react-native-pull-to-refresh';
import reqBook from './reqBook'

export default class PullRefresh extends React.Component {
  // refresh() {
  //   // return new Promise((resolve, reject) => {
  //   //   setTimeout(() => {resolve()}, 2000)
  //   //   });
  //
  //   const bookSeeker = "https://go-api-staging.herokuapp.com/books";
  //
  //   reqBook(bookSeeker)
  //     .then((books) => {
  //       console.log(books);
  //     })
  //     .catch((error) => console.error(error));
  //   }

  render() {
    return(
      <PTRView onRefresh={this.props.refresh}>
        <View style={styles.container}>
          <Text style={styles.text}>データを取得できませんでした。</Text>
          <Text style={styles.text}>画面を下にスワイプし更新してください。</Text>
        </View>
      </PTRView>
    )
  }
}

const styles = StyleSheet.create({
  container:
    {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 100,
    },
  text:
    {
      fontSize: 17,
    }
});