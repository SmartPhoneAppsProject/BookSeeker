import { connect } from 'react-redux';
import {
  getAllTags,
  toggleChosenFromId,
} from '../actions';
import EntryTagsScreen from '../components/EntryTagsScreen';

const mapStateToProps = ({ loading, tag }, props) => ({
  isLoading: loading.isLoading,
  tags: tag.tags,
  ...props.navigation.state.params,
});

const mapDispatchToProps = dispatch => ({
  getAllTags() {
    dispatch(getAllTags());
  },
  toggleChosenFromId(id) {
    dispatch(toggleChosenFromId(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EntryTagsScreen);
