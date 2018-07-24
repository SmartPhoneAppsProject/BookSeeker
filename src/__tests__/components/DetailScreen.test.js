import React from 'react';
import { shallow } from 'enzyme';
import DetailScreen from '../../components/DetailScreen';
import _books from '../../api/books.json';

describe('<EntryScreen />', () => {
  it('正しくレンダリングされていること', () => {
    const navigation = {
      state: {
        params: {
          item: _books[0],
        },
      },
    };
    const wrapper = shallow(<DetailScreen
      book={_books[0]}
      navigation={navigation}
    />);
    expect(wrapper).toMatchSnapshot();
  });
});
