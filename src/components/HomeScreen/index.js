import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { AppLoading } from 'expo';
import BookList from './BookList';
import PullRefresh from '../PullRefresh';
import { LogoEntry } from '../LogoEntry';
import { LogoSAP } from '../LogoSAP';
import { indexStyles as styles } from './Styles';

const HomeScreen = (props) => {
  if (props.isLoading) {
    return <AppLoading />;
  }

  if (props.error) {
    return <PullRefresh refresh={props.getAllBooks} />;
  }

  return (
    <View style={styles.container}>
      <BookList
        style={styles.listView}
        books={props.books}
        navigation={props.navigation}
        onRefresh={props.getAllBooks}
        isLoading={props.isLoading}
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
