import { connect } from 'react-redux';
import ScanScreen from '../components/ScanScreen';

const mapStateToProps = (state, props) => ({
  ...props.navigation.state.params,
});

export default connect(mapStateToProps)(ScanScreen);
