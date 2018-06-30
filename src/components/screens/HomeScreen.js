import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { AppLoading } from 'expo';
import ListView from '../ListView';
import PullRefresh from '../PullRefresh';
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

export const HomeScreen = (props) => {
  if (props.isLoading) {
    return <AppLoading />;
  }

  if (props.error) {
    return <PullRefresh refresh={props.getAllBooks} />;
  }

  return (
    <View style={styles.container}>
      <ListView
        style={styles.listView}
        books={props.books}
        navigation={props.navigation}
      />
    </View>
  );
};

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
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

HomeScreen.defaultProps = {
  books: [],
  error: '',
};

export default HomeScreen;
