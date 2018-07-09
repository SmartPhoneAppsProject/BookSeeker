/**
 * Mocking client-server processing
 */
import _books from './books.json';
import _tags from './tags.json';

const TIMEOUT = 2000;

export default {
  // getBooks: (callback, timeout) => setTimeout(() => callback(_books), timeout || TIMEOUT),
  getBooks: () => new Promise(resolve => setTimeout(() => resolve(_books), TIMEOUT)),
  lentBooks: (payload, callback, timeout) => setTimeout(() => callback(), timeout || TIMEOUT),
  // getTags: (callback, timeout) => setTimeout(() => callback(_tags), timeout || TIMEOUT),
  getTags: () => new Promise(resolve => setTimeout(() => resolve(_tags), TIMEOUT)),
  registerTags: (payload, callback, timeout) => setTimeout(() => callback(), timeout || TIMEOUT),
};
