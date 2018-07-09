import reducer from '../../reducers/loading';
import { REQUEST_API, REQUEST_API_FAIL, REQUEST_API_SUCCESS } from '../../constants/actionTypes';

describe('tag Reducer', () => {
  test('初期値を返すこと', () => {
    const state = undefined;
    const action = {};
    const result = reducer(state, action);
    const expected = {
      isLoading: false,
      error: null,
    };

    expect(result).toEqual(expected);
  });

  test('アクションがREQUEST_APIのとき', () => {
    const state = {
      isLoading: false,
      error: null,
    };
    const action = {
      type: REQUEST_API,
    };
    const result = reducer(state, action);
    const expected = {
      isLoading: true,
      error: null,
    };

    expect(result).toEqual(expected);
  });

  test('アクションがREQUEST_API_SUCCESSのとき', () => {
    const state = {
      isLoading: false,
      error: null,
    };
    const action = {
      type: REQUEST_API_SUCCESS,
    };
    const result = reducer(state, action);
    const expected = {
      isLoading: false,
      error: null,
    };

    expect(result).toEqual(expected);
  });

  test('アクションがREQUEST_API_FAILのとき', () => {
    const state = {
      isLoading: false,
      error: null,
    };
    const action = {
      type: REQUEST_API_FAIL,
      payload: {
        error: 'Internal server error',
      },
    };
    const result = reducer(state, action);
    const expected = {
      isLoading: false,
      error: 'Internal server error',
    };

    expect(result).toEqual(expected);
  });
});
