import React from 'react';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import HomeScreenContainer from '../../containers/HomeScreenContainer';
import _books from '../../api/books.json';

const initialState = {
  book: {
    books: _books,
  },
  loading: {
    isLoading: false,
  },
};

const middleware = [thunk];
const mockStore = configureStore(middleware);
let wrapper;
let store;

beforeEach(() => {
  store = mockStore(initialState);
  wrapper = shallow(
    <HomeScreenContainer />,
    { context: { store } },
  );
});

test('<HomeScreenContainer />', () => {
  expect(wrapper.dive()).toMatchSnapshot();
});
