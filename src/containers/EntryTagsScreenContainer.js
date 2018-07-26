import { connect } from 'react-redux';
import EntryTagsScreen from '../components/EntryTagsScreen';

const mapStateToProps = (state, props) => ({
  ...props.navigation.state.params,
});

export default connect(mapStateToProps)(EntryTagsScreen);
