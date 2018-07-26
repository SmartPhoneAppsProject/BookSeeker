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
        isbn={book.isbn}
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
