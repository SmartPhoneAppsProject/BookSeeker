import React from 'react';
import renderer from 'react-test-renderer';
import HomeScreen from '../../components/screens/HomeScreen';
import _books from '../../api/books.json';

test('renders correctly', () => {
  const tree = renderer.create(<HomeScreen
    getAllBooks={jest.fn()}
    isLoading={false}
    books={_books}
  />).toJSON();
  expect(tree).toMatchSnapshot();
});
