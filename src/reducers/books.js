import {
  GET_BOOKS,
  GET_BOOK,
} from '../constants/actionTypes';

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
    case GET_BOOK:
      return {
        // todo async
        book: state.books[action.id],
      };
    default:
      return state;
  }
};

export default books;
