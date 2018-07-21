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
      dispatch(requestFail(JSON.parse(error)));
    });
};

export const permissionGranted = ({
  type: types.PERMISSIONS_GRANTED,
});

export const permissionDenied = ({
  type: types.PERMISSIONS_DENIED,
});

export const isbnReading = () => ({
  type: types.ISBN_READING,
});

export const isbnOK = isbn => ({
  type: types.ISBN_OK,
  payload: {
    isbn,
  },
});

export const isbnInvalid = () => ({
  type: types.ISBN_INVALID,
});
