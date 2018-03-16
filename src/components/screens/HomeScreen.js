import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator
} from 'react-native';

import ListView from '../ListView';
import PullRefresh from '../PullRefresh';
import { getBooks } from '../../utils/Network';
import LogoEntry from '../LogoEntry';
import LogoSAP from '../LogoSAP';

export default class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft:
        <View style={styles.navigationContainer}>
          <LogoSAP/>
        </View>,
      title: 'Home',
      headerRight:
        <View style={styles.navigationContainer}>
          <LogoEntry navigation={navigation}/>
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
    getBooks()
      .then((books) => {
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
    getBooks()
      .then((books) => {
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
    if (this.state.isLoading) {
      return (
        <View style={styles.isLoading}>
          <ActivityIndicator/>
        </View>
      );
    }

    if (!this.state.respStatus) {
      return (
        <PullRefresh refresh={this._refresh}/>
      );
    }

    return (
      <View style={styles.container}>
        <ListView
          style={styles.listView}
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
    backgroundColor: '#ffffff',
  },
  indicator: {
    flex: 1,
    paddingTop: 20,
  },
});
