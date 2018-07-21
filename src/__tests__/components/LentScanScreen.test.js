import React from 'react';
import renderer from 'react-test-renderer';

import LentScanScreen from '../../components/LentScanScreen';

describe('<LentScanScreen />', () => {
  it('正しくレンダリングされること', () => {
    const tree = renderer
      .create(<LentScanScreen action="return" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
