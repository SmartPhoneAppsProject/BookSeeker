import React from 'react';
import { shallow } from 'enzyme';
import ScanScreen from '../../components/ScanScreen';
import _books from '../../api/books.json';

describe('<ScanScreen />', () => {
  it('正しくレンダリングされていること', () => {
    const book = _books[0];
    const wrapper = shallow(<ScanScreen
      title={book.title}
      published={book.published}
    />);
    expect(wrapper).toMatchSnapshot();
  });
});
