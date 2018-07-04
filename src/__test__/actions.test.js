import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../actions';
import * as types from '../constants/actionTypes';
import _books from '../api/books.json';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
  test('request Action Creator', () => {
    const result = actions.request();
    const expected = {
      type: types.REQUEST_API,
    };

    expect(result).toEqual(expected);
  });

  test('requestSuccess Action Creator', () => {
    const result = actions.requestSuccess();
    const expected = {
      type: types.REQUEST_API_SUCCESS,
    };

    expect(result).toEqual(expected);
  });

  test('requestFail Action Creator', () => {
    const error = 'Internal server error';
    const result = actions.requestFail(error);
    const expected = {
      type: types.REQUEST_API_FAIL,
      payload: {
        error,
      },
    };

    expect(result).toEqual(expected);
  });

  test('getBooks Action Creator', () => {
    const books = _books;
    const result = actions.getBooks(books);
    const expected = {
      type: types.GET_BOOKS,
      payload: {
        books,
      },
    };

    expect(result).toEqual(expected);
  });

  test('getAllMockBooks Action Creator', () => {
    const books = _books;
    fetch.mockResponse(JSON.stringify(books));
    const expected = [
      {
        type: types.REQUEST_API,
      },
      {
        type: types.REQUEST_API_SUCCESS,
      },
      {
        type: types.GET_BOOKS,
        payload: {
          books,
        },
      },
    ];
    const store = mockStore();

    return store.dispatch(actions.getAllBooks())
      .then(() => {
        expect(store.getActions()).toEqual(expected);
      });
  });
});
