import {
  GET_BOOKS,
  GET_BOOK,
} from '../constants/actionTypes';

const initialState = {
  books: [],
};

const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOKS:
      return {
        ...state,
        books: action.payload.books,
      };
    case GET_BOOK:
      return {
        ...state,
        book: action.payload.book,
      };
    default:
      return state;
  }
};

export default booksReducer;
