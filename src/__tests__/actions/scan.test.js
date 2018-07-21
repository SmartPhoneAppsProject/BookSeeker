import * as actions from '../../actions';
import * as types from '../../constants/actionTypes';

describe('actions', () => {
  test('カメラのパーミッションが許可するアクションが生成されること', () => {
    const expected = {
      type: types.PERMISSIONS_GRANTED,
    };
    expect(actions.permissionGranted).toEqual(expected);
  });

  test('カメラのパーミッションが拒否されるアクションが生成されること', () => {
    const expected = {
      type: types.PERMISSIONS_DENIED,
    };
    expect(actions.permissionDenied).toEqual(expected);
  });

  test('カメラの読み取り中のアクションが生成されること', () => {
    const expected = {
      type: types.ISBN_READING,
      payload: {
        isbn: null,
      },
    };
    expect(actions.isbnReading()).toEqual(expected);
  });

  test('カメラの読み取り完了のアクションが生成されること', () => {
    const isbn = 1234567890123;
    const expected = {
      type: types.ISBN_OK,
      payload: {
        isbn,
      },
    };
    expect(actions.isbnOK(isbn)).toEqual(expected);
  });

  test('カメラの読み取りエラーのアクションが生成されること', () => {
    const expected = {
      type: types.ISBN_INVALID,
      payload: {
        isbn: null,
      },
    };
    expect(actions.isbnInvalid()).toEqual(expected);
  });
});
