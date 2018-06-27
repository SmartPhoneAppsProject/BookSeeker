/**
 * Mocking client-server processing
 */
import _books from './books.json';
import _tags from './tags.json';

const TIMEOUT = 100;

export default {
  getBooks: (cb, timeout) => setTimeout(() => cb(_books), timeout || TIMEOUT),
  lentBooks: (payload, cb, timeout) => setTimeout(() => cb(), timeout || TIMEOUT),
  getTags: (cb, timeout) => setTimeout(() => cb(_tags), timeout || TIMEOUT),
  registerTags: (payload, cb, timeout) => setTimeout(() => cb(), timeout || TIMEOUT),
};
