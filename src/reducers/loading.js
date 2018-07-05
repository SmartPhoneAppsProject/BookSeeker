import {
  REQUEST_API_SUCCESS,
  REQUEST_API_FAIL, REQUEST_API,
} from '../constants/actionTypes';

const initialState = {
  isLoading: false,
  error: null,
};

const loading = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_API:
      return {
        isLoading: true,
        error: null,
      };
    case REQUEST_API_SUCCESS:
      return {
        isLoading: false,
        error: null,
      };
    case REQUEST_API_FAIL:
      return {
        isLoading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default loading;
