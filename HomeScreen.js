import React, { Component } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native';

import ListView from './ListView';
import PullRefresh from './pullRefresh';
import reqBook from './reqBook';
import LogoEntry from './LogoEntry';

export default class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Home',
      headerRight:
        <View style={styles.navigationContainer}>
          <LogoEntry navigation={navigation} />
        </View>
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      books: [],
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
            respStatus: true,
            isLoading: false,
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
            respStatus: true,
            isLoading: false
          });
        }
      })
      .catch((error) => console.error(error));
  }

  render() {
    const { navigate } = this.props.navigation;

    if (this.state.isLoading) {
      return (
        <View style={styles.isLoading}>
          <ActivityIndicator />
        </View>
      );
    }

    if (!this.state.respStatus) {
      return (
        <PullRefresh refresh={this._refresh} />
      );
    }

    return (
      <View style={styles.container}>
        <ListView
          books={this.state.books}
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navigationContainer: {
    flexDirection: 'row',
  },
  isLoading: {
    flex: 1,
    paddingTop: 20
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  indicator: {
    flex: 1,
    paddingTop: 20,
  }
});
