import * as actions from '../../actions';
import * as types from '../../constants/actionTypes';

describe('form actions', () => {
  test('タイトルを変更するアクションが生成されること', () => {
    const title = 'タイトル';
    const expected = {
      type: types.CHANGE_TITLE,
      payload: {
        title,
      },
    };
    expect(actions.changeTitle(title)).toEqual(expected);
  });

  test('datetimePickerの日付を変更するアクションが生成されること', () => {
    const date = new Date();
    const expected = {
      type: types.CHOOSE_DATE,
      payload: {
        date,
      },
    };
    expect(actions.chooseDate(date)).toEqual(expected);
  });

  test('出版日を変更するアクションが生成されること', () => {
    const published = new Date();
    const expected = {
      type: types.CHANGE_PUBLISHED,
      payload: {
        published,
      },
    };
    expect(actions.changePublished(published)).toEqual(expected);
  });

  test('写真を取得するアクションが生成されること', () => {
    const photo = 'base64';
    const expected = {
      type: types.PICK_PHOTO,
      payload: {
        photo,
      },
    };
    expect(actions.pickPhoto(photo)).toEqual(expected);
  });

  test('DatetimePickerの表示を切り替えるアクションが生成されること', () => {
    const datetimePickerVisible = false;
    const expected = {
      type: types.TOGGLE_DATETIME_PICKER,
      payload: {
        datetimePickerVisible: !datetimePickerVisible,
      },
    };
    expect(actions.toggleDatetimePicker()).toEqual(expected);
  });

  test('タイトルのバリデーションを行うアクションが生成されること', () => {
    const validation = true;
    const errorMessage = 'タイトルが入力されていません';
    const expected = {
      type: types.VALIDATE_TITLE,
      payload: {
        validation,
        errorMessage,
      },
    };
    expect(actions.validateTitle(errorMessage)).toEqual(expected);
  });
});

