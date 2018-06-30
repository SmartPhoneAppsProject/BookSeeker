import server from '../api/server';
import * as types from '../constants/actionTypes';

const getBooks = books => ({
  type: types.GET_BOOKS,
  payload: {
    books,
  },
});

export const getAllBooks = () => (dispatch) => {
  server.getBooks((books) => {
    dispatch(getBooks(books));
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
