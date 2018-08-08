import reducer from '../../reducers/scan';
import {
  PERMISSIONS_GRANTED,
  PERMISSIONS_DENIED,
  ISBN_READING,
  ISBN_OK,
  ISBN_INVALID,
} from '../../constants/actionTypes';

describe('scan Reducer', () => {
  test('初期化値を返すこと', () => {
    const state = undefined;
    const action = {};
    const result = reducer(state, action);
    const expected = {
      permissions: 'denied',
      cameraStatus: 'reading',
      isbn: '',
    };

    expect(result).toEqual(expected);
  });

  test('PERMISSIONS_GRANTEDアクションが正しく処理されること', () => {
    const state = {
      permissions: 'denied',
    };
    const action = {
      type: PERMISSIONS_GRANTED,
    };
    const result = reducer(state, action);
    const expected = {
      permissions: 'granted',
    };

    expect(result).toEqual(expected);
  });

  test('PERMISSIONS_DENIEDアクションが正しく処理されること', () => {
    const state = {
      permissions: 'granted',
    };
    const action = {
      type: PERMISSIONS_DENIED,
    };
    const result = reducer(state, action);
    const expected = {
      permissions: 'denied',
    };

    expect(result).toEqual(expected);
  });

  test('ISBN_READINGアクションが正しく処理されること', () => {
    const state = {
      cameraStatus: 'invalid',
    };
    const action = {
      type: ISBN_READING,
    };
    const result = reducer(state, action);
    const expected = {
      cameraStatus: 'reading',
      isbn: null,
    };

    expect(result).toEqual(expected);
  });

  test('ISBN_OKアクションが正しく処理されること', () => {
    const isbn = '1234567890123';
    const state = {
      cameraStatus: 'reading',
    };
    const action = {
      type: ISBN_OK,
      payload: {
        isbn,
      },
    };
    const result = reducer(state, action);
    const expected = {
      cameraStatus: 'ok',
      isbn,
    };

    expect(result).toEqual(expected);
  });

  test('ISBN_INVALIDアクションが正しく処理されること', () => {
    const state = {
      cameraStatus: 'reading',
    };
    const action = {
      type: ISBN_INVALID,
    };
    const result = reducer(state, action);
    const expected = {
      cameraStatus: 'invalid',
      isbn: null,
    };

    expect(result).toEqual(expected);
  });
});
