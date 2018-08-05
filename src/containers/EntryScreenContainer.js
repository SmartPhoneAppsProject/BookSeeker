import { connect } from 'react-redux';
import {
  changeTitle,
  chooseDate,
  choosePhoto,
  toggleDateTimePicker,
  validateTitle,
} from '../actions';
import EntryScreen from '../components/EntryScreen';

const mapStateToProps = ({ form }) => ({
  title: form.title,
  chosenDate: form.chosenDate,
  published: form.published,
  photo: form.photo,
  dateTimePickerVisible: form.dateTimePickerVisible,
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
  choosePhoto(photo) {
    dispatch(choosePhoto(photo));
  },
  toggleDateTimePicker(visibility) {
    dispatch(toggleDateTimePicker(visibility));
  },
  validateTitle(errorMessage) {
    dispatch(validateTitle(errorMessage));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EntryScreen);
