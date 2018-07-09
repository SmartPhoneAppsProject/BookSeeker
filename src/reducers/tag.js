import { GET_TAG } from '../constants/actionTypes';

const initialState = {
  tags: [],
};

// fixme
const tag = (state = initialState, action) => {
  switch (action.type) {
    case GET_TAG:
      return {
        ...state,
        tag: state.tasks.concat([action.tag]),
      };
    default:
      return state;
  }
};

export default tag;
