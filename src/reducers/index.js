import { combineReducers } from 'redux';
import book from './book';
import tag from './tag';
import loading from './loading';
import scan from './scan';
import form from './form';

export default combineReducers({
  book,
  tag,
  loading,
  scan,
  form,
});

