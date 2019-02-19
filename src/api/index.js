import { API_ENDPOINT } from 'react-native-dotenv';

export const changeStatus = (jancode, status) => (
  fetch(`${API_ENDPOINT}/books`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jancode,
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

export const register = (title, jancode, image, published, tagIds) => (
  fetch(`${API_ENDPOINT}/books`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      jancode: String(jancode),
      image,
      published,
      tag_ids: tagIds,
    }),
  })
);

export const postBook = (title, image, published, jancode, chosenIds) => (
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
      jancode,
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

const renamePropToStr = (oldProp, newProp, { [oldProp]: value, ...others }) => ({
  [newProp]: `${value}`,
  ...others,
});

export const getAllBooks = () => (
  fetch(`${API_ENDPOINT}/books`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response);
    })
    .then(resJson => resJson.map(book => renamePropToStr('jan_code', 'jancode', book))
      .map(book => renamePropToStr('published_at', 'published', book)))
  // {
  //   const { jan_code: jancode, published_at: published, ...others } = book;
  //
  //   return {
  //     jancode,
  //     published,
  //    ...others,
  //   };
  // })
);
