import React from 'react';

export const getData = uri => {
  return new Promise((resolve, reject) => {
    fetch(uri)
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

export const putData = json => {
  return new Promise((resolve, reject) => {
    const uri = 'https://go-api-staging.herokuapp.com/books';
    const headers = new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json'
    });
    const options = {
      method: 'PUT',
      headers: headers,
      body: json
    };
    const request = new Request(uri, options);

    fetch(request)
      .then(response => resolve(response));
  });
}

export const postData = json => {
  return new Promise((resolve, reject) => {
    const uri = 'https://go-api-staging.herokuapp.com/books';
    const headers = new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json'
    });
    const options = {
      method: 'POST',
      headers: headers,
      body: json,
    };
    const request = new Request(uri, options);

    fetch(request)
      .then(response => resolve(response));
  });
}
