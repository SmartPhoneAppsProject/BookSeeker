import { connect } from 'react-redux';
import {
  permissionsGranted,
  permissionsDenied,
  isbnReading,
  isbnOk,
  isbnInvalid,
  requestChangeStatus,
} from '../actions';
import LentScanScreen from '../components/LentScanScreen';

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
  requestChangeStatus(isbn, status) {
    dispatch(requestChangeStatus(isbn, status));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LentScanScreen);
