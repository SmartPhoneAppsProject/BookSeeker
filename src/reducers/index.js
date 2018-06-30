import { combineReducers } from 'redux';
import book from './book';
import tag from './tag';
import loading from './loading';

export default combineReducers({
  book,
  tag,
  loading,
});

