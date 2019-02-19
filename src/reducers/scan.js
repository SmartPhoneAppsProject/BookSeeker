import {
  PERMISSIONS_GRANTED,
  PERMISSIONS_DENIED,
  READING_JANCODE,
  VALID_JANCODE,
  INVALID_JANCODE,
} from '../constants/actionTypes';

const initialState = {
  permissions: 'denied',
  cameraStatus: 'reading',
  jancode: '',
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
    case READING_JANCODE:
      return {
        ...state,
        cameraStatus: 'reading',
      };
    case VALID_JANCODE:
      return {
        ...state,
        cameraStatus: 'ok',
        jancode: action.payload.jancode,
      };
    case INVALID_JANCODE:
      return {
        ...state,
        cameraStatus: 'invalid',
      };
    default:
      return state;
  }
};

export default scan;
