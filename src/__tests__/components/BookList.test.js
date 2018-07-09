import React from 'react';
import { shallow } from 'enzyme';
import BookList from '../../components/HomeScreen/BookList';
import _books from '../../api/books.json';

describe('<BookList />', () => {
  it('booksが変更されたとき', () => {
    const wrapper = shallow(<BookList
      books={_books}
      onRefresh={jest.fn()}
      isLoading={false}
    />);
    expect(wrapper).toMatchSnapshot();
    wrapper.setProps({ books: _books.slice(0, 5) });
    expect(wrapper).toMatchSnapshot();
  });
});
