import server from '../api/mockServer';
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
      if (books) {
        dispatch(getBooks(books));
      }
    })
    .catch((error) => {
      dispatch(requestFail(`${error}`));
    });
};

export const getAllBooks = () => (dispatch) => {
  dispatch(request());

  return api.getAllBooks()
    .then((books) => {
      dispatch(requestSuccess());
      dispatch(getBooks(books));
    })
    .catch((error) => {
      dispatch(requestFail(error));
    });
};

export const postBook = (title, image, published, jancode, chosenIds) => (dispatch) => {
  console.log(JSON.stringify({
    title,
    image,
    published,
    jancode,
    tag_ids: chosenIds,
    status: false,
  }));

  api.postBook(title, image, published, jancode, chosenIds)
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

  return api.getAllTags()
    .then((tags) => {
      dispatch(requestSuccess());
      if (tags) {
        dispatch(getTags(tags));
      }
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

export const readingJANCODE = () => ({
  type: types.READING_JANCODE,
});

export const validISNB = jancode => ({
  type: types.VALID_JANCODE,
  payload: {
    jancode,
  },
});

export const invalidJANCODE = () => ({
  type: types.INVALID_JANCODE,
});

export const changeStatusFromJancode = (jancode, status) => (dispatch) => {
  dispatch(request());

  api.changeStatus(jancode, status)
    .then((resJson) => {
      console.log(resJson);
      dispatch(requestSuccess());
      // todo reducerでbooksのstatusを変更する
      // todo またはgetAllBooksを行う
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
