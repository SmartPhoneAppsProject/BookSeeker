import React from 'react';
import { shallow } from 'enzyme';
import Index from '../../components/EntryScreen';

describe('<EntryScreen />', () => {
  it('正しくレンダリングされていること', () => {
    const wrapper = shallow(<Index
      maximumDate={new Date('Tue Jul 24 2018 15:06:25 GMT+0900')}
      date={new Date('Tue Jul 24 2018 15:06:25 GMT+0900')}
    />);
    expect(wrapper).toMatchSnapshot();
  });
});
