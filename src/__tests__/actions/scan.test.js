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
      type: types.READING_ISBN,
    };
    expect(actions.readingISBN()).toEqual(expected);
  });

  test('カメラの読み取り完了のアクションが生成されること', () => {
    const isbn = 1234567890123;
    const expected = {
      type: types.VALID_ISBN,
      payload: {
        isbn,
      },
    };
    expect(actions.validISNB(isbn)).toEqual(expected);
  });

  test('カメラの読み取りエラーのアクションが生成されること', () => {
    const expected = {
      type: types.INVALID_ISBN,
    };
    expect(actions.invalidISBN()).toEqual(expected);
  });
});
