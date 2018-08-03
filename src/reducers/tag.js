import { GET_TAGS } from '../constants/actionTypes';

const initialState = {
  tags: [],
};

const tag = (state = initialState, action) => {
  switch (action.type) {
    case GET_TAGS:
      return {
        ...state,
        tags: action.payload.tags,
      };
    default:
      return state;
  }
};

export default tag;
