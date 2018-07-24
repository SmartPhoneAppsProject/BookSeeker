import reducer from '../../reducers/book';
import _books from '../../api/books.json';
import {
  GET_BOOK,
  GET_BOOKS,
} from '../../constants/actionTypes';

describe('book Reducer', () => {
  test('初期値を返すこと', () => {
    const state = undefined;
    const action = {};
    const result = reducer(state, action);
    const expected = {
      books: [],
    };

    expect(result).toEqual(expected);
  });

  test('GET_BOOKSアクションが正しく処理されること', () => {
    const state = {
      books: _books.slice(0, 5),
      book: _books[0],
    };
    const action = {
      type: GET_BOOKS,
      payload: {
        books: _books,
      },
    };
    const result = reducer(state, action);
    const expected = {
      books: _books,
      book: _books[0],
    };

    expect(result).toEqual(expected);
  });

  test('GET_BOOKアクションが正しく処理されること', () => {
    const state = {
      books: _books,
      book: _books[1],
    };
    const action = {
      type: GET_BOOK,
      payload: {
        book: _books[0],
      },
    };
    const result = reducer(state, action);
    const expected = {
      books: _books,
      book: _books[0],
    };

    expect(result).toEqual(expected);
  });
});
