import { API_ENDPOINT } from 'react-native-dotenv';

const baseUri = API_ENDPOINT;


export const getBooks = () => {
  return new Promise((resolve, reject) => {
    fetch(`${baseUri}/books`)
      .then((response) => {
        if (response.ok) {
          console.log('Success');
          return response.json()
        } else {
          console.log('Fail');
          let books = '';
          resolve(books)
        }
      })
      .then((data) => {
        let books = [];
        for (let book of data) {
          books.push({
            key: book.id,
            image: book.image,
            jan_code: book.jan_code,
            published_at: book.published_at,
            status: book.status,
            tags: book.tags,
            title: book.title,
            updated_at: book.updated_at,
            created_at: book.created_at,
          });
        }
        resolve(books);
      })
      .catch((error) => console.error(error));
  });
};

export const rentBook = json => {
  return new Promise((resolve, reject) => {
    const headers = new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json'
    });
    const options = {
      method: 'PUT',
      headers: headers,
      body: json
    };
    const request = new Request(`${baseUri}/books`, options);

    fetch(request)
      .then(response => resolve(response));
  });
};

export const postBook = json => {
  return new Promise((resolve, reject) => {
    const headers = new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json'
    });
    const options = {
      method: 'POST',
      headers: headers,
      body: json,
    };
    const request = new Request(`${baseUri}/books`, options);

    fetch(request)
      .then(response => resolve(response));
  });
};

export const getTags = () => {
  return new Promise((resolve, reject) => {
    fetch(`${baseUri}/tags`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          reject(response);
        }
      })
      .then((data) => {
        let tags = [];
        for (let tag of data) {
          console.log(tag);
          tags.push({
            id: tag.id,
            name: tag.name,
          });
        }
        resolve(tags);
      })
      .catch((error) => reject(error));
  });
};

export const tagLinkBook = json => {
  return new Promise((resolve, reject) => {
    const headers = new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json'
    });
    const options = {
      method: 'POST',
      headers: headers,
      body: json,
    };
    const request = new Request(`${baseUri}/books/tags`, options);

    fetch(request)
      .then(response => resolve(response));
  });
};
