import { combineReducers } from 'redux';
import books from './books';
import tags from './tags';

export default combineReducers({
  books,
  tags,
});

