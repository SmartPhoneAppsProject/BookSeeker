import {
  PERMISSIONS_GRANTED,
  PERMISSIONS_DENIED,
  ISBN_READING,
  ISBN_OK,
  ISBN_INVALID,
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
    case ISBN_READING:
      return {
        ...state,
        cameraStatus: 'reading',
        isbn: null,
      };
    case ISBN_OK:
      return {
        ...state,
        cameraStatus: 'ok',
        isbn: action.payload.isbn,
      };
    case ISBN_INVALID:
      return {
        ...state,
        cameraStatus: 'invalid',
        isbn: null,
      };
    default:
      return state;
  }
};

export default scan;
