import React from 'react';
import { shallow } from 'enzyme';
import EntryTagsScreen from '../../components/EntryTagsScreen';
import _books from '../../api/books.json';

describe('<EntryTagsScreen />', () => {
  it('正しくレンダリングされていること', () => {
    const book = _books[0];
    const wrapper = shallow(<EntryTagsScreen
      title={book.title}
      isbn={book.isbn}
      published={book.published}
    />);
    expect(wrapper).toMatchSnapshot();
  });
});
