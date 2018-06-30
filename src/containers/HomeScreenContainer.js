import { connect } from 'react-redux';
import { getAllBooks } from '../actions';
import HomeScreen from '../components/screens/HomeScreen';

// Storeから必要なStateを取り出し、ComponentのPropsに割り当てる
const mapStateToProps = ({ books }) => ({
  books,
});

const mapDispatchToProps = dispatch => ({
  getAllBooks() {
    dispatch(getAllBooks());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
