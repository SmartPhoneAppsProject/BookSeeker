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

  test('DatetimePickerの日付を変更するアクションが生成されること', () => {
    const chosenDate = new Date(2018, 1, 1);
    const expected = {
      type: types.CHOOSE_DATE,
      payload: {
        chosenDate,
      },
    };
    expect(actions.chooseDate(chosenDate)).toEqual(expected);
  });

  test('写真を取得するアクションが生成されること', () => {
    const photo = 'base64';
    const expected = {
      type: types.CHOOSE_PHOTO,
      payload: {
        photo,
      },
    };
    expect(actions.choosePhoto(photo)).toEqual(expected);
  });

  test('DatetimePickerの表示を切り替えるアクションが生成されること', () => {
    const dateTimePickerVisible = true;
    const visible = {
      type: types.TOGGLE_DATETIME_PICKER,
      payload: {
        dateTimePickerVisible,
      },
    };
    const invisible = {
      type: types.TOGGLE_DATETIME_PICKER,
      payload: {
        dateTimePickerVisible,
      },
    };
    expect(actions.toggleDateTimePicker(dateTimePickerVisible)).toEqual(visible);
    expect(actions.toggleDateTimePicker(dateTimePickerVisible)).toEqual(invisible);
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

