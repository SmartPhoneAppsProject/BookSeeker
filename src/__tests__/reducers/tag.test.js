import reducer from '../../reducers/tag';
import _tags from '../../api/tags.json';
import {
  GET_TAGS,
  TOGGLE_CHOSEN,
} from '../../constants/actionTypes';

describe('tag Reducer', () => {
  test('初期値を返すこと', () => {
    const state = undefined;
    const action = {};
    const result = reducer(state, action);
    const expected = {
      tags: [],
    };

    expect(result).toEqual(expected);
  });

  test('GET_TAGSアクションが正しく処理されること', () => {
    const state = {
      tags: _tags.slice(0, 5),
    };
    const action = {
      type: GET_TAGS,
      payload: {
        tags: _tags,
      },
    };
    const result = reducer(state, action);
    const expected = {
      tags: _tags.map(tag => ({
        ...tag,
        chosen: false,
      })),
    };

    expect(result).toEqual(expected);
  });

  test('TOGGLE_CHOSENアクションが正しく処理されること', () => {
    const tags = _tags.map(tag => ({
      ...tag,
      chosen: false,
    }));
    const state = {
      tags,
    };
    const action = {
      type: TOGGLE_CHOSEN,
      payload: {
        id: 1,
      },
    };
    const result = reducer(state, action);
    const expected = {
      tags: tags.map((tag) => {
        if (tag.id === action.payload.id) {
          return {
            ...tag,
            chosen: true,
          };
        }
        return tag;
      }),
      // tags: Object.assign(tags, {
      //   ...tags[action.payload.id],
      //   chosen: true,
      // }),
    };

    expect(result).toEqual(expected);
  });
});
