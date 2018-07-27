import React from 'react';
import { shallow } from 'enzyme';
import { AppLoading } from 'expo';

import HomeScreen from '../../components/HomeScreen';
import BookList from '../../components/HomeScreen/BookList';
import EmptyComponent from '../../components/HomeScreen/EmptyComponent';
import _books from '../../api/books.json';

describe('<HomeScreen />', () => {
  it('<BookList />を表示していること', () => {
    const wrapper = shallow(<HomeScreen
      books={_books}
      getAllBooks={jest.fn()}
      isLoading={false}
    />);
    expect(wrapper.find(BookList).length).toBe(1);
  });

  it('データを取得しているとき<AppLoading />を表示していること', () => {
    const wrapper = shallow(<HomeScreen
      books={_books}
      getAllBooks={jest.fn()}
      isLoading
    />);
    expect(wrapper.find(AppLoading).length).toBe(1);
  });

  it('データの取得を失敗したとき<EmptyComponet />を表示していること', () => {
    const wrapper = shallow(<HomeScreen
      books={_books}
      getAllBooks={jest.fn()}
      isLoading={false}
      error="Internal server error"
    />);
    expect(wrapper.find(EmptyComponent).length).toBe(1);
  });
});
