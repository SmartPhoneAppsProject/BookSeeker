import { combineReducers } from 'redux';
import books from './booksReducer';
import tags from './tags';

export default combineReducers({
  books,
  tags,
});

