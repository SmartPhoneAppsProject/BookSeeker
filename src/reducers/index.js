import { combineReducers } from 'redux';
import booksReducer from './booksReducer';
import tagsReducer from './tagsReducer';

export default combineReducers({
  booksReducer,
  tagsReducer,
});

