import { connect } from 'react-redux';
import DetailScreen from '../components/DetailScreen';

const mapStateToProps = (state, props) => ({
  ...props.navigation.state.params,
});

export default connect(mapStateToProps)(DetailScreen);
