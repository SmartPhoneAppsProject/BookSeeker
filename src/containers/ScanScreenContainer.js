import { connect } from 'react-redux';
import {
  permissionsGranted,
  permissionsDenied,
  readingISBN,
  validISNB,
  invalidISBN,
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
  readingISBN() {
    dispatch(readingISBN());
  },
  validISBN(isbn) {
    dispatch(validISNB(isbn));
  },
  invalidISBN() {
    dispatch(invalidISBN());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ScanScreen);
