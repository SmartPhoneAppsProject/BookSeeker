import React from 'react';
import renderer from 'react-test-renderer';

import LentScanScreen from '../../components/LentScanScreen';

describe('<LentScanScreen />', () => {
  it('正しくレンダリングされること', () => {
    const tree = renderer
      .create(<LentScanScreen
        permissions="granted"
        status="reading"
        isbn={null}
        action="return"
        permissionsGranted={jest.fn()}
        permissionsDenied={jest.fn()}
        isbnReading={jest.fn()}
        isbnOk={jest.fn()}
        isbnInvalid={jest.fn()}
        requestChangeStatus={jest.fn()}
      />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
