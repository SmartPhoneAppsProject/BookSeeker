import { connect } from 'react-redux';
import { getAllBooks } from '../actions';
import HomeScreen from '../components/screens/HomeScreen';

const mapStateToProps = ({ book }) => ({
  books: book.books,
});

const mapDispatchToProps = dispatch => ({
  getAllBooks() {
    dispatch(getAllBooks());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
