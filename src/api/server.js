/**
 * Mocking client-server processing
 */
import _books from './books.json';
import _tags from './tags.json';

const TIMEOUT = 100;

export default {
  getBooks: (callback, timeout) => setTimeout(() => callback(_books), timeout || TIMEOUT),
  lentBooks: (payload, callback, timeout) => setTimeout(() => callback(), timeout || TIMEOUT),
  getTags: (callback, timeout) => setTimeout(() => callback(_tags), timeout || TIMEOUT),
  registerTags: (payload, callback, timeout) => setTimeout(() => callback(), timeout || TIMEOUT),
};
