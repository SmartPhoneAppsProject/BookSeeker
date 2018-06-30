import server from '../api/server';
import * as types from '../constants/actionTypes';

// action
const getBooks = books => ({
  type: types.GET_BOOKS,
  books,
});

// actionCreator
export const getAllBooks = () => (dispatch) => {
  server.getBooks((books) => {
    dispatch(getBooks(books));
  });
};

const getTags = tags => ({
  type: types.GET_TAGS,
  tags,
});

export const getAllTags = () => (dispatch) => {
  server.getTags((tags) => {
    dispatch(getTags(tags));
  });
};
