import { GET_BOOKS } from '../constants/actionTypes';

const initialState = {
  books: [],
};

const books = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOKS:
      return {
        ...state,
        books: state.books.concat([action.books]),
      };
    default:
      return state;
  }
};

export default books;
