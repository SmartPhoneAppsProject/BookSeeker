import React from 'react';
import { shallow } from 'enzyme';
import EntryTagsScreen from '../../components/EntryTagsScreen';
import _books from '../../api/books.json';
import _tags from '../../api/tags.json';

describe('<EntryTagsScreen />', () => {
  it('正しくレンダリングされていること', () => {
    const book = _books[0];
    const wrapper = shallow(<EntryTagsScreen
      tags={_tags}
      title={book.title}
      isbn={book.isbn}
      published={book.published}
      image={{}}
      isLoading={false}
      getAllTags={jest.fn()}
      postBook={jest.fn()}
      toggleChosenFromId={jest.fn()}
    />);
    expect(wrapper).toMatchSnapshot();
  });
});
