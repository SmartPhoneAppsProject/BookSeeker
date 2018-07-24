import React from 'react';
import { shallow } from 'enzyme';
import EntryScreen from '../../components/screens/EntryScreen';

describe('<EntryScreen />', () => {
  it('正しくレンダリングされていること', () => {
    const wrapper = shallow(<EntryScreen
      maximumDate={new Date('Tue Jul 24 2018 15:06:25 GMT+0900')}
    />);
    expect(wrapper).toMatchSnapshot();
  });
});
