import { combineReducers } from 'redux';
import book from './book';
import tag from './tag';
import loading from './loading';
import scan from './scan';

export default combineReducers({
  book,
  tag,
  loading,
  scan,
});

