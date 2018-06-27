import { GET_TAG } from '../constants/actionTypes';

const initialState = {
  tags: [],
};

const tags = (state = initialState, action) => {
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

export default tags;
