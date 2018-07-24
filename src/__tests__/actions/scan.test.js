import * as actions from '../../actions';
import * as types from '../../constants/actionTypes';

describe('actions', () => {
  test('カメラのパーミッションが許可するアクションが生成されること', () => {
    const expected = {
      type: types.PERMISSIONS_GRANTED,
    };
    expect(actions.permissionsGranted()).toEqual(expected);
  });

  test('カメラのパーミッションが拒否されるアクションが生成されること', () => {
    const expected = {
      type: types.PERMISSIONS_DENIED,
    };
    expect(actions.permissionsDenied()).toEqual(expected);
  });

  test('カメラの読み取り中のアクションが生成されること', () => {
    const expected = {
      type: types.ISBN_READING,
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
    expect(actions.isbnOk(isbn)).toEqual(expected);
  });

  test('カメラの読み取りエラーのアクションが生成されること', () => {
    const expected = {
      type: types.ISBN_INVALID,
    };
    expect(actions.isbnInvalid()).toEqual(expected);
  });
});
