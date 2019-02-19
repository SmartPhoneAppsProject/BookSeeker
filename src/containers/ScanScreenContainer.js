import { connect } from 'react-redux';
import {
  permissionsGranted,
  permissionsDenied,
  readingJANCODE,
  validISNB,
  invalidJANCODE,
} from '../actions';
import ScanScreen from '../components/ScanScreen';

const mapStateToProps = ({ scan }, props) => ({
  permissions: scan.permissions,
  cameraStatus: scan.cameraStatus,
  jancode: scan.jancode,
  ...props.navigation.state.params,
});

const mapDispatchToProps = dispatch => ({
  permissionsGranted() {
    dispatch(permissionsGranted());
  },
  permissionsDenied() {
    dispatch(permissionsDenied());
  },
  readingJANCODE() {
    dispatch(readingJANCODE());
  },
  validJANCODE(jancode) {
    dispatch(validISNB(jancode));
  },
  invalidJANCODE() {
    dispatch(invalidJANCODE());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ScanScreen);
