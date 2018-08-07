import * as actions from '../../actions';
import * as types from '../../constants/actionTypes';

describe('tag actions', () => {
  test('タグ選択を変更するアクションが生成されること', () => {
    const id = 1;
    const expected = {
      type: types.TOGGLE_CHOSEN,
      payload: {
        id,
      },
    };
    expect(actions.toggleChosenFromId(id)).toEqual(expected);
  });
});
