import server from '../api/server';
import * as types from '../constants/actionTypes';

// actionCreator
const getBooks = books => ({
  type: types.GET_BOOKS,
  payload: {
    books,
  },
});

// 非同期的に実行されるactionCreator
// thunkミドルウェアにより通常のActionオブジェクト以外に関数をりたんできるようになる
export const getAllBooks = () => (dispatch) => {
  server.getBooks((books) => {
    // actionを発行が発行され、ReducerによってStoreの状態が変化する
    dispatch(getBooks(books));
  });
};

// actionCreator
const getTags = tags => ({
  type: types.GET_TAGS,
  payload: {
    tags,
  },
});

export const getAllTags = () => (dispatch) => {
  server.getTags((tags) => {
    dispatch(getTags(tags));
  });
};
