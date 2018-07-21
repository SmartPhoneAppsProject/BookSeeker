import { connect } from 'react-redux';
import LentScanScreen from '../components/LentScanScreen';

const mapStateToProps = (state, props) => ({
  ...props.navigation.state.params,
});

export default connect(mapStateToProps)(LentScanScreen);
