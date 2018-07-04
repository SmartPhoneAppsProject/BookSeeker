import server from '../api/server';
import * as types from '../constants/actionTypes';

export const request = () => ({
  type: types.REQUEST_API,
});

export const requestSuccess = () => ({
  type: types.REQUEST_API_SUCCESS,
});

export const requestFail = error => ({
  type: types.REQUEST_API_FAIL,
  payload: {
    error,
  },
});

export const getBooks = books => ({
  type: types.GET_BOOKS,
  payload: {
    books,
  },
});

export const getAllMockBooks = () => (dispatch) => {
  dispatch(request());
  server.getBooks()
    .then((books) => {
      dispatch(requestSuccess());
      dispatch(getBooks(books));
    })
    .catch((error) => {
      dispatch(requestFail(error));
    });
};

export const getAllBooks = () => (dispatch) => {
  dispatch(request());

  return fetch('https://example.com/books')
    .then(response => response.json())
    .then((books) => {
      dispatch(requestSuccess());
      dispatch(getBooks(books));
    })
    .catch((error) => {
      dispatch(requestFail(error));
    });
};

