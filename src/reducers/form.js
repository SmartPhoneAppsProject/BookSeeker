import {
  CHANGE_TITLE,
  CHOOSE_DATE,
  CHOOSE_PHOTO,
  TOGGLE_DATETIME_PICKER,
  VALIDATE_TITLE,
} from '../constants/actionTypes';

const current = new Date();
// month 0 ~ 11
const formatDate = date => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
const initialState = {
  title: '',
  chosenDate: new Date(current.getFullYear(), current.getMonth(), current.getDate()),
  published: formatDate(current),
  image: {},
  dateTimePickerVisible: false,
  validation: false,
  errorMessage: ' ',
};

const form = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_TITLE:
      return {
        ...state,
        title: action.payload.title,
        validation: false,
      };
    case CHOOSE_DATE:
      return {
        ...state,
        chosenDate: action.payload.chosenDate,
        published: formatDate(action.payload.chosenDate),
      };
    case CHOOSE_PHOTO:
      return {
        ...state,
        image: action.payload.image,
      };
    case TOGGLE_DATETIME_PICKER:
      return {
        ...state,
        dateTimePickerVisible: action.payload.dateTimePickerVisible,
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
