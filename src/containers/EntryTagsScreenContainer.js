import { connect } from 'react-redux';
import {
  getAllTags,
  toggleChosenFromId,
  postBook,
} from '../actions';
import EntryTagsScreen from '../components/EntryTagsScreen';

const mapStateToProps = (state, props) => ({
  tags: state.tag.tags,
  isbn: state.scan.isbn,
  title: state.form.title,
  published: state.form.published,
  image: state.form.image,
  isLoading: state.loading.isLoading,
  ...props.navigation.state.params,
});

const mapDispatchToProps = dispatch => ({
  getAllTags() {
    dispatch(getAllTags());
  },
  toggleChosenFromId(id) {
    dispatch(toggleChosenFromId(id));
  },
  postBook(title, image, published, isbn, chosenIds) {
    dispatch(postBook(title, image, published, isbn, chosenIds));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EntryTagsScreen);
