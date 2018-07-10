import React from 'react';
import { shallow } from 'enzyme';
import DetailScreen from '../../components/screens/DetailScreen';
import _books from '../../api/books.json';

describe('<DetailScreen />', () => {
  it('正しくレンダリングされていること', () => {
    const navigation = {
      state: {
        params: {
          item: _books[0],
        },
      },
    };
    const wrapper = shallow(<DetailScreen
      navigation={navigation}
    />);
    expect(wrapper).toMatchSnapshot();
  });
});
