import API_ENDPOINT from '../utils/endpoint';

export const changeStatus = (isbn, status) => (
  fetch(`${API_ENDPOINT}/books`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      isbn,
      status,
    }),
  })
);

export const register = (title, isbn, image, published, tagIds) => (
  fetch(`${API_ENDPOINT}/books`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      isbn: String(isbn),
      image,
      published,
      tag_ids: tagIds,
    }),
  })
);
