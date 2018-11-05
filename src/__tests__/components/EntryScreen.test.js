import React from 'react';
import { shallow } from 'enzyme';
import EntryScreen from '../../components/EntryScreen';

describe('<EntryScreen />', () => {
  it('正しくレンダリングされていること', () => {
    const current = new Date(2018, 1, 1);
    const formatDate = '2018-1-1';
    const title = '';
    const chosenDate = current;
    const published = formatDate;
    const image = {};
    const dateTimePickerVisible = false;
    const validation = false;
    const errorMessage = '';
    const wrapper = shallow(<EntryScreen
      title={title}
      chosenDate={chosenDate}
      published={published}
      image={image}
      dateTimePickerVisible={dateTimePickerVisible}
      validation={validation}
      errorMessage={errorMessage}
      changeTitle={jest.fn()}
      chooseDate={jest.fn()}
      choosePhoto={jest.fn()}
      toggleDateTimePicker={jest.fn()}
      validateTitle={jest.fn()}

      currentTime={current}
    />);
    expect(wrapper).toMatchSnapshot();
  });
});
