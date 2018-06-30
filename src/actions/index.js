import server from '../api/server';
import * as types from '../constants/actionTypes';

const request = () => ({
  type: types.REQUEST_API,
});

const requestSuccess = () => ({
  type: types.REQUEST_API_SUCCESS,
});

const requestFail = error => ({
  type: types.REQUEST_API_FAIL,
  payload: {
    error,
  },
});

const getBooks = books => ({
  type: types.GET_BOOKS,
  payload: {
    books,
  },
});

export const getAllBooks = () => (dispatch) => {
  dispatch(request());
  server.getBooks()
    .then((books) => {
      dispatch(getBooks(books));
      dispatch(requestSuccess());
    })
    .catch((error) => {
      dispatch(requestFail(error));
    });
};

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

