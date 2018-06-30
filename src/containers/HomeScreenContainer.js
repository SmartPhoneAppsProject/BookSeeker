import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HomeScreen from '../components/screens/HomeScreen';

const HomeScreenContainer = props => (
  <HomeScreen
    books={props.books}
    navigation={props.navigation}
  />
);

HomeScreenContainer.propTypes = {
  books: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    status: PropTypes.bool.isRequired,
    isbn: PropTypes.string.isRequired,
  })),
};

HomeScreenContainer.defaultProps = {
  books: [],
};

// Storeから必要なStateを取り出し、ComponentのPropsに割り当てる
const mapStateToProps = ({ books }) => ({
  books,
});

export default connect(mapStateToProps)(HomeScreenContainer);
