import reducer from '../../reducers/form';
import {
  CHANGE_TITLE,
  CHOOSE_DATE,
  CHOOSE_PHOTO,
  TOGGLE_DATETIME_PICKER,
  VALIDATE_TITLE,
} from '../../constants/actionTypes';

describe('form Reducer', () => {
  test('初期値を返すこと', () => {
    const state = undefined;
    const action = {};
    const result = reducer(state, action);
    const current = new Date();
    const chosenDate = new Date(current.getFullYear(), current.getMonth(), current.getDate());
    const formatDate = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`;
    const expected = {
      title: '',
      chosenDate,
      published: formatDate,
      photo: {},
      dateTimePickerVisible: false,
      validation: false,
      errorMessage: '',
    };

    expect(result).toEqual(expected);
  });

  test('CHANGE_TITLEアクションが正しく処理されること', () => {
    const state = {
      title: 'タイト',
    };
    const action = {
      type: CHANGE_TITLE,
      payload: {
        title: 'タイトル',
      },
    };
    const result = reducer(state, action);
    const expected = {
      title: action.payload.title,
      validation: false,
    };

    expect(result).toEqual(expected);
  });

  test('CHOOSE_DATEアクションが正しく処理されること', () => {
    const state = {
      chosenDate: new Date(2017, 11, 11),
    };
    const action = {
      type: CHOOSE_DATE,
      payload: {
        chosenDate: new Date(2018, 0, 1),
      },
    };
    const result = reducer(state, action);
    const expected = {
      chosenDate: new Date(2018, 0, 1),
      published: '2018-1-1',
    };

    expect(result).toEqual(expected);
  });

  test('PICK_PHOTOアクションが正しく処理されること', () => {
    const state = {
      photo: '',
    };
    const action = {
      type: CHOOSE_PHOTO,
      payload: {
        photo: 'base64',
      },
    };
    const result = reducer(state, action);
    const expected = {
      photo: action.payload.photo,
    };
    expect(result).toEqual(expected);
  });

  test('TOGGLE_DATETIME_PICKERアクションが正しく処理されること', () => {
    const visibility = true;
    const state = {
      dateTimePickerVisible: false,
    };
    const action = {
      type: TOGGLE_DATETIME_PICKER,
      payload: {
        dateTimePickerVisible: visibility,
      },
    };
    const result = reducer(state, action);
    const expected = {
      dateTimePickerVisible: action.payload.dateTimePickerVisible,
    };
    expect(result).toEqual(expected);
  });

  test('VALIDATE_TITLEアクションが正しく処理されること', () => {
    const state = {
      validation: false,
      errorMessage: '',
    };
    const action = {
      type: VALIDATE_TITLE,
      payload: {
        validation: true,
        errorMessage: 'タイトルが空です',
      },
    };
    const result = reducer(state, action);
    const expected = {
      validation: action.payload.validation,
      errorMessage: action.payload.errorMessage,
    };
    expect(result).toEqual(expected);
  });
});
