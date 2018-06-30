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

class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
    const { books, navigation } = this.props;

    return (
      <View style={styles.container}>
        <ListView
          style={styles.listView}
          books={books}
          navigation={navigation}
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

HomeScreen.propTypes = {
  books: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    status: PropTypes.bool.isRequired,
    isbn: PropTypes.string.isRequired,
  })),
  getAllBooks: PropTypes.func.isRequired,
};

HomeScreen.defaultProps = {
  books: [],
};

export default HomeScreen;
