import React, { Component } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native';

import ListView from './ListView';
import PullRefresh from './PullRefresh';
import { getData } from './networking';
import LogoEntry from './LogoEntry';
import LogoSAP from './LogoSAP';
import SearchScreen from './SearchScreen';

export default class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft:
        <View style={styles.navigationContainer}>
          <LogoSAP />
        </View>,
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
      tmpBooks: [],
      isLoading: true,
      respStatus: true,
    };

    this._refresh = this._refresh.bind(this);
    this.setBooksOnList = this.setBooksOnList.bind(this)
  }

  componentDidMount() {
    const bookSeeker = "https://go-api-staging.herokuapp.com/books";

    getData(bookSeeker)
      .then((books) => {
        if (!books) {
          this.setState({
            respStatus: false,
            isLoading: false
          });
        } else {
          this.setState({
            books,
            tmpBooks: books,
            respStatus: true,
            isLoading: false,
          });
        }
      })
      .catch((error) => console.error(error));
  }

  _refresh() {
    const bookSeeker = "https://go-api-staging.herokuapp.com/books";

    getData(bookSeeker)
      .then((books) => {
        if (!books) {
          this.setState({
            respStatus: false,
            isLoading: false
          });
        } else {
          this.setState({
            books,
            tmpBooks: books,
            respStatus: true,
            isLoading: false
          });
        }
      })
      .catch((error) => console.error(error));
  }

  setBooksOnList(books) {
    this.setState({ tmpBooks: books });
  }

  render() {
    const { navigate } = this.props.navigation;

    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
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
        <SearchScreen
          books={this.state.books}
          tmpBooks={this.state.tmpBooks}
          setBooksOnList={this.setBooksOnList} />

        <ListView books={this.state.tmpBooks} navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navigationContainer: {
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#fff',
  },
  indicator: {
    flex: 1,
    paddingTop: 20,
  }
});
