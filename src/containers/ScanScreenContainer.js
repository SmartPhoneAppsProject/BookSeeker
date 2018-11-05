import { connect } from 'react-redux';
import {
  permissionsGranted,
  permissionsDenied,
  isbnReading,
  isbnOk,
  isbnInvalid,
} from '../actions';
import ScanScreen from '../components/ScanScreen';

const mapStateToProps = ({ scan }, props) => ({
  permissions: scan.permissions,
  cameraStatus: scan.cameraStatus,
  isbn: scan.isbn,
  ...props.navigation.state.params,
});

const mapDispatchToProps = dispatch => ({
  permissionsGranted() {
    dispatch(permissionsGranted());
  },
  permissionsDenied() {
    dispatch(permissionsDenied());
  },
  isbnReading() {
    dispatch(isbnReading());
  },
  isbnOk(isbn) {
    dispatch(isbnOk(isbn));
  },
  isbnInvalid() {
    dispatch(isbnInvalid());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ScanScreen);
