import { GET_TAGS, TOGGLE_CHOSEN } from '../constants/actionTypes';

const initialState = {
  tags: [],
};

const tag = (state = initialState, action) => {
  switch (action.type) {
    case GET_TAGS:
      return {
        ...state,
        tags: action.payload.tags.map(v => ({
          ...v,
          chosen: false,
        })),
      };
    case TOGGLE_CHOSEN:
      return {
        ...state,
        tags: state.tags.map((v) => {
          if (v.id === action.payload.id) {
            return {
              ...v,
              chosen: !v.chosen,
            };
          }
          return v;
        }),
      };
    default:
      return state;
  }
};

export default tag;
