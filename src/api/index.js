import { API_ENDPOINT } from 'react-native-dotenv';

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
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response);
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

export const postBook = (title, image, published, isbn, chosenIds) => (
  fetch(`${API_ENDPOINT}/books`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      image,
      published,
      isbn,
      tag_ids: chosenIds,
      status: false,
    }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response);
    })
);

export const getAllTags = () => (
  fetch(`${API_ENDPOINT}/tags`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response);
    })
);

export const getAllBooks = () => (
  fetch(`${API_ENDPOINT}/books`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response);
    })
    .then(resJson => resJson)
);
