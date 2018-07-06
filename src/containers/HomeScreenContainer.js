import { connect } from 'react-redux';
import { getAllMockBooks } from '../actions';
import HomeScreen from '../components/HomeScreen';

const mapStateToProps = ({ book, loading }) => ({
  books: book.books,
  isLoading: loading.isLoading,
  error: loading.error,
});

const mapDispatchToProps = dispatch => ({
  getAllBooks() {
    dispatch(getAllMockBooks());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
