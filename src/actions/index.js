import { API_ENDPOINT } from 'react-native-dotenv';
import server from '../api/server';
import * as types from '../constants/actionTypes';

const baseUri = API_ENDPOINT;

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

  return fetch(`${baseUri}/books`)
    .then(response => response.json())
    .then((books) => {
      dispatch(requestSuccess());
      dispatch(getBooks(books));
    })
    .catch((error) => {
      dispatch(requestFail(JSON.parse(error)));
    });
};

export const permissionsGranted = () => ({
  type: types.PERMISSIONS_GRANTED,
});

export const permissionsDenied = () => ({
  type: types.PERMISSIONS_DENIED,
});

export const isbnReading = () => ({
  type: types.ISBN_READING,
});

export const isbnOk = isbn => ({
  type: types.ISBN_OK,
  payload: {
    isbn,
  },
});

export const isbnInvalid = () => ({
  type: types.ISBN_INVALID,
});

export const requestChangeStatus = body => (dispatch) => {
  console.log(body);
  dispatch(request());

  return fetch(`${baseUri}/books`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body,
  })
    .then((response) => {
      console.log(response.json);
      if (response.ok) {
        dispatch(requestSuccess());
      } else {
        dispatch(requestFail(response.json()));
      }
    })
    .catch((error) => {
      dispatch(requestFail(JSON.parse(error)));
    });
};
