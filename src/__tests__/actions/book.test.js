import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../actions';
import * as types from '../../constants/actionTypes';
import _books from '../../api/books.json';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('actions', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test('getAllMockBooks Action Creator with success', () => {
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

    return store.dispatch(actions.getAllMockBooks())
      .then(() => {
        expect(store.getActions()).toEqual(expected);
      });
  });

  test('getAllMockBooks Action Creator with fail', () => {
    const error = { code: 500, message: 'Internal Server Error' };
    fetch.mockReject(JSON.stringify(error));
    const expected = [
      {
        type: types.REQUEST_API,
      },
      {
        type: types.REQUEST_API_FAIL,
        payload: {
          error,
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
