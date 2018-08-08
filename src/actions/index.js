import API_ENDPOINT from '../utils/endpoint';
import server from '../api/server';
import * as api from '../api';
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

  return server.getBooks()
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

  return fetch(`${API_ENDPOINT}/books`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response);
    })
    .then((resJson) => {
      dispatch(requestSuccess());
      dispatch(getBooks(resJson.books));
    })
    .catch((error) => {
      dispatch(requestFail(JSON.parse(error)));
    });
};

export const postBook = (title, image, published, isbn, chosenIds) => (dispatch) => {
  console.log(JSON.stringify({
    title,
    image,
    published,
    isbn,
    tag_ids: chosenIds,
    status: false,
  }));

  api.postBook(title, image, published, isbn, chosenIds)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response);
    })
    .then((resJson) => {
      console.log(resJson);
      dispatch(requestSuccess());
    })
    .catch((error) => {
      dispatch(requestFail(JSON.parse(error)));
    });
};

const getTags = tags => ({
  type: types.GET_TAGS,
  payload: {
    tags,
  },
});

export const getAllTags = () => (dispatch) => {
  dispatch(request());

  return fetch(`${API_ENDPOINT}/tags`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response);
    })
    .then((resJson) => {
      dispatch(requestSuccess());
      dispatch(getTags(resJson));
    })
    .catch((error) => {
      dispatch(requestFail(JSON.parse(error)));
    });
};

export const toggleChosenFromId = id => ({
  type: types.TOGGLE_CHOSEN,
  payload: {
    id,
  },
});

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

export const changeStatusFromIsbn = (isbn, status) => (dispatch) => {
  dispatch(request());

  api.changeStatus(isbn, status)
    .then((response) => {
      if (response.ok) {
        return dispatch(requestSuccess());
        // todo reducerでbooksを変更する
      }
      throw new Error(response);
    })
    .catch((error) => {
      dispatch(requestFail(JSON.parse(error)));
    });
};

export const changeTitle = title => ({
  type: types.CHANGE_TITLE,
  payload: {
    title,
  },
});

export const chooseDate = chosenDate => ({
  type: types.CHOOSE_DATE,
  payload: {
    chosenDate,
  },
});

export const choosePhoto = image => ({
  type: types.CHOOSE_PHOTO,
  payload: {
    image,
  },
});

export const toggleDateTimePicker = visibility => ({
  type: types.TOGGLE_DATETIME_PICKER,
  payload: {
    dateTimePickerVisible: visibility,
  },
});

export const validateTitle = errorMessage => ({
  type: types.VALIDATE_TITLE,
  payload: {
    validation: true,
    errorMessage,
  },
});
