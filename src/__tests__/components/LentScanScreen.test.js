import React from 'react';
import renderer from 'react-test-renderer';
import _book from '../../api/books.json';

import LentScanScreen from '../../components/LentScanScreen';

describe('<LentScanScreen />', () => {
  it('正しくレンダリングされること', () => {
    const book = _book[0];
    const tree = renderer
      .create(<LentScanScreen
        bookStatus
        permissions="granted"
        cameraStatus="reading"
        jancode={book.jancode}
        permissionsGranted={jest.fn()}
        permissionsDenied={jest.fn()}
        jancodeReading={jest.fn()}
        jancodeOk={jest.fn()}
        jancodeInvalid={jest.fn()}
        requestChangeStatus={jest.fn()}
        changeStatusFromJancode={jest.fn()}
      />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
