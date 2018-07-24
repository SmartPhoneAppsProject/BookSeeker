import {
  PERMISSIONS_GRANTED,
  PERMISSIONS_DENIED,
  ISBN_READING,
  ISBN_OK,
  ISBN_INVALID,
} from '../constants/actionTypes';

const initialState = {
  permissions: 'denied',
  status: 'reading',
  isbn: null,
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
        status: 'reading',
        isbn: null,
      };
    case ISBN_OK:
      return {
        ...state,
        status: 'ok',
        isbn: action.payload.isbn,
      };
    case ISBN_INVALID:
      return {
        ...state,
        status: 'invalid',
        isbn: null,
      };
    default:
      return state;
  }
};

export default scan;
