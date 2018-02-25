import React from 'react';
import PullRefresh from './pullRefresh';

export default function reqBook(uri) {
  return new Promise((resolve, reject) => {
    fetch(uri)
      .then((response) => {
        if (response.ok) {
          console.log('ok');
          return response.json()
        } else {
          console.log('OMG!ʕ◔ϖ◔ʔ');
        }
      })
      .then((data) => {
        console.log(data);
        let books = [];
        for (i in data) {
          books.push({
            key: data[i].id,
            image: data[i].image,
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