import React from 'react';
import { shallow } from 'enzyme';
import EntryScreen from '../../components/EntryScreen';

describe('<EntryScreen />', () => {
  it('正しくレンダリングされていること', () => {
    const mockDate = new Date('Tue Jul 24 2018 15:06:25 GMT+0900');
    const wrapper = shallow(<EntryScreen
      maximumDate={mockDate}
      date={mockDate}
    />);
    expect(wrapper).toMatchSnapshot();
  });
});
