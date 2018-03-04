import React from 'react';
import { Button, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import AddListView from './AddListView';
import EditText from './EditText';
import PullRefresh from './pullRefresh'
import Bar from './Bar';
import reqBook from './reqBook'

export default class FindBookList extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      books: [],
      resultbooks: [],
      isLoading: true,
      respStatus: true,
    };

    this._refresh = this._refresh.bind(this);
  }

  componentDidMount() {
    const bookSeeker = "https://go-api-staging.herokuapp.com/books";

    reqBook(bookSeeker)
      .then((books) => {
        console.log(books);
        if (!books) {
          this.setState({
            respStatus: false,
            isLoading: false
          });
        } else {
          this.setState({
            books,
            resultbooks:books,
            respStatus: true,
            isLoading: false
          });

        }
      })
      .catch((error) => console.error(error));
  }

  _refresh() {
    const bookSeeker = "https://go-api-staging.herokuapp.com/books";

    reqBook(bookSeeker)
      .then((books) => {
        console.log(books);
        if (!books) {
          this.setState({
            respStatus: false,
            isLoading: false
          });
        } else {
          this.setState({
            books,
            resultbooks:books,
            respStatus: true,
            isLoading: false
          });
        }
      })
      .catch((error) => console.error(error));
  }


    searchBack(books){
        this.setState({resultbooks:books});
    }

  static navigationOptions = {
    title: 'FindBookList',
  };

  render() {
    const { navigate } = this.props.navigation;

    if (this.state.isLoading) {
      return (
        <View style={styles.indicator}>
          <ActivityIndicator />
        </View>
      );
    }

    console.log(this.state.respStatus);
    if (!this.state.respStatus) {
      return (
        <PullRefresh refresh={this._refresh} />
      );
    }

    return (
      <View style={styles.container}>
        <Button
          title="新規"
          onPress={() => navigate('New')}
        />
        <Button
          title="貸出・返却"
          onPress={() => navigate('Details')}
        />

        <EditText
            books={this.state.books}
            searchBack={this.searchBack.bind(this)}
        />

        <AddListView books={this.state.resultbooks} navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container:
      {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: '#fff',
      },
    indicator:
      {
        flex: 1,
        paddingTop: 20,
      }
});
