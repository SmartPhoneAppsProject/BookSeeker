import {
  PERMISSIONS_GRANTED,
  PERMISSIONS_DENIED,
  READING_ISBN,
  VALID_ISBN,
  INVALID_ISBN,
} from '../constants/actionTypes';

const initialState = {
  permissions: 'denied',
  cameraStatus: 'reading',
  isbn: '',
};

const scan = (state = initialState, action) => {
  switch (action.type) {
    case PERMISSIONS_GRANTED:
      return {
        ...state,
        permissions: 'granted',
      };
    case PERMISSIONS_DENIED:
      return {
        ...state,
        permissions: 'denied',
      };
    case READING_ISBN:
      return {
        ...state,
        cameraStatus: 'reading',
      };
    case VALID_ISBN:
      return {
        ...state,
        cameraStatus: 'ok',
        isbn: action.payload.isbn,
      };
    case INVALID_ISBN:
      return {
        ...state,
        cameraStatus: 'invalid',
      };
    default:
      return state;
  }
};

export default scan;
