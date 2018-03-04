import React from 'react';

export default function reqBook(uri) {
  return new Promise((resolve, reject) => {
    fetch(uri)
      .then((response) => {
        console.log(response);
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
        for (i in data) {
          books.push({
            key: data[i].id,
            // image: data[i].image,
            image: 'https://facebook.github.io/react/logo-og.png',
            jan_code: data[i].jan_code,
            published_at: data[i].published_at,
            status: data[i].status,
            tags: data[i].tags,
            title: data[i].title,
            updated_at: data[i].updated_at,
            created_at: data[i].created_at,
          });
        }
        resolve(books);
      })
      .catch((error) => console.error(error));
  });
}
