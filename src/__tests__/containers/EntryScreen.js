import React from 'react';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import EntryScreenContainer from '../../containers/EntryScreenContainer';

const initialState = {
  title: '',
  chosenDate: new Date(2018, 1, 1),
  published: '2018-1-1',
  image: '',
  dateTimePickerVisible: false,
  validation: false,
  errorMessage: '',
};

const middleware = [thunk];
const mockStore = configureStore(middleware);
let wrapper;
let store;

beforeEach(() => {
  store = mockStore(initialState);
  wrapper = shallow(
    <EntryScreenContainer />,
    { context: { store } },
  );
});

test('<EntryScreenContainer />', () => {
  expect(wrapper.dive()).toMatchSnapshot();
});

