import {
  REQUEST_API_SUCCESS,
  REQUEST_API_FAIL, REQUEST_API,
} from '../constants/actionTypes';

const initialState = {
  isLoading: true,
  error: null,
};

const loading = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_API:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case REQUEST_API_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    case REQUEST_API_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default loading;
