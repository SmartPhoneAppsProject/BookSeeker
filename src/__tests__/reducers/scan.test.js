import reducer from '../../reducers/scan';
import {
  PERMISSIONS_GRANTED,
  PERMISSIONS_DENIED,
  READING_JANCODE,
  VALID_JANCODE,
  INVALID_JANCODE,
} from '../../constants/actionTypes';

describe('scan Reducer', () => {
  test('初期化値を返すこと', () => {
    const state = undefined;
    const action = {};
    const result = reducer(state, action);
    const expected = {
      permissions: 'denied',
      cameraStatus: 'reading',
      jancode: '',
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

  test('JANCODE_READINGアクションが正しく処理されること', () => {
    const state = {
      cameraStatus: 'invalid',
    };
    const action = {
      type: READING_JANCODE,
    };
    const result = reducer(state, action);
    const expected = {
      cameraStatus: 'reading',
      jancode: null,
    };

    expect(result).toEqual(expected);
  });

  test('JANCODE_OKアクションが正しく処理されること', () => {
    const jancode = '1234567890123';
    const state = {
      cameraStatus: 'reading',
    };
    const action = {
      type: VALID_JANCODE,
      payload: {
        jancode,
      },
    };
    const result = reducer(state, action);
    const expected = {
      cameraStatus: 'ok',
      jancode,
    };

    expect(result).toEqual(expected);
  });

  test('JANCODE_INVALIDアクションが正しく処理されること', () => {
    const state = {
      cameraStatus: 'reading',
    };
    const action = {
      type: INVALID_JANCODE,
    };
    const result = reducer(state, action);
    const expected = {
      cameraStatus: 'invalid',
      jancode: null,
    };

    expect(result).toEqual(expected);
  });
});
