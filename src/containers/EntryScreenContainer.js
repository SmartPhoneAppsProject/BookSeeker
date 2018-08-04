import { connect } from 'react-redux';
import {
  changeTitle,
  chooseDate,
  changePublished,
  pickPhoto,
  toggleDatetimePicker,
  validateTitle,
} from '../actions';
import EntryScreen from '../components/EntryScreen';

const mapStateToProps = ({ form }) => ({
  title: form.title,
  chosenDate: form.chosenDate,
  published: form.published,
  photo: form.photo,
  isDateTimePickerVisible: form.isDateTimePickerVisible,
  validation: form.validation,
  errorMessage: form.errorMessage,
});

const mapDispatchToProps = dispatch => ({
  changeTitle(title) {
    dispatch(changeTitle(title));
  },
  chooseDate(date) {
    dispatch(chooseDate(date));
  },
  changePublished(published) {
    dispatch(changePublished(published));
  },
  pickPhoto(photo) {
    dispatch(pickPhoto(photo));
  },
  toggleDatetimePicker(visibility) {
    dispatch(toggleDatetimePicker(visibility));
  },
  validateTitle(errorMessage) {
    dispatch(validateTitle(errorMessage));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EntryScreen);
