import {
  CHANGE_TITLE,
  CHOOSE_DATE,
  CHANGE_PUBLISHED,
  PICK_PHOTO,
  TOGGLE_DATETIME_PICKER,
  VALIDATE_TITLE,
} from '../constants/actionTypes';

const initialState = {
  title: '',
  chosenDate: '',
  published: '',
  photo: '',
  isDateTimePickerVisible: false,
  validation: false,
  errorMessage: '',
};

const form = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_TITLE:
      return {
        ...state,
        title: action.payload.title,
      };
    case CHOOSE_DATE:
      return {
        ...state,
        date: action.payload.date,
      };
    case CHANGE_PUBLISHED:
      return {
        ...state,
        published: action.payload.published,
      };
    case PICK_PHOTO:
      return {
        ...state,
        photo: action.payload.photo,
      };
    case TOGGLE_DATETIME_PICKER:
      return {
        ...state,
        datetimePickerVisible: action.payload.datetimePickerVisible,
      };
    case VALIDATE_TITLE:
      return {
        ...state,
        validation: action.payload.validation,
        errorMessage: action.payload.errorMessage,
      };
    default:
      return state;
  }
};

export default form;
