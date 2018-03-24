import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { AppLoading } from 'expo';
import ListView from '../ListView';
import PullRefresh from '../PullRefresh';
import { getBooks } from '../../utils/Network';
import LogoEntry from '../LogoEntry';
import LogoSAP from '../LogoSAP';

export default class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <View style={styles.navigationContainer}>
          <LogoSAP/>
        </View>
      ),
      title: 'BookSeeker',
      headerRight: (
        <View style={styles.navigationContainer}>
          <LogoEntry navigation={navigation}/>
        </View>
      ),
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      books: [],
      isLoading: true,
      responseStatus: false,
    };
  }

  componentDidMount() {
    getBooks(
      (books) => {
        console.log('Success');
        this.setState({
          books,
          responseStatus: true,
          isLoading: false,
        });
      },
      (error) => {
        console.warn(error);
        this.setState({ isLoading: false });
      },
    );
  }

  _refresh = () => {
    getBooks(
      (books) => {
        console.log('Success');
        this.setState({
          books,
          responseStatus: true,
          isLoading: false,
        });
      },
      (error) => {
        console.warn(error);
        this.setState({ isLoading: false });
      },
    );
  };

  render() {
    if (this.state.isLoading) {
      return (
        <AppLoading/>
      );
    }

    if (!this.state.responseStatus) {
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
    paddingTop: 20,
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
