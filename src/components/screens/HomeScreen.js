import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { AppLoading } from 'expo';
import ListView from '../ListView';
import PullRefresh from '../PullRefresh';
import { getBooks } from '../../utils/Network';
import { LogoEntry } from '../LogoEntry';
import { LogoSAP } from '../LogoSAP';

const styles = StyleSheet.create({
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
export default class HomeScreen extends Component {
  constructor(props) {
    super(props);

    console.log(props);
    this.state = {
      books: [],
      isLoading: true,
      responseStatus: false,
    };
  }

  componentDidMount() {
    getBooks(
      (books) => {
        this.setState({
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

  refresh = () => {
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
        <AppLoading />
      );
    }

    if (!this.state.responseStatus) {
      return (
        <PullRefresh refresh={this.refresh} />
      );
    }

    return (
      <View style={styles.container}>
        <ListView
          style={styles.listView}
          books={this.props.books.books}
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}

HomeScreen.navigationOptions = ({
  headerLeft: <LogoSAP />,
  title: 'BookSeeker',
  headerRight: <LogoEntry />,
});

// HomeScreen.propTypes = {
//   books: PropTypes.shape({
//     books: PropTypes.arrayOf(PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       title: PropTypes.string.isRequired,
//       image: PropTypes.string.isRequired,
//       status: PropTypes.bool.isRequired,
//       isbn: PropTypes.string.isRequired,
//     })),
//   }),
// };
//
// HomeScreen.defaultProps = {
//   books: [],
// };

