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
      type: types.READING_JANCODE,
    };
    expect(actions.readingJANCODE()).toEqual(expected);
  });

  test('カメラの読み取り完了のアクションが生成されること', () => {
    const jancode = 1234567890123;
    const expected = {
      type: types.VALID_JANCODE,
      payload: {
        jancode,
      },
    };
    expect(actions.validISNB(jancode)).toEqual(expected);
  });

  test('カメラの読み取りエラーのアクションが生成されること', () => {
    const expected = {
      type: types.INVALID_JANCODE,
    };
    expect(actions.invalidJANCODE()).toEqual(expected);
  });
});
