import API_ENDPOINT from '../utils/endpoint';

export const changeStatus = (isbn, status) => {
  const body = status ?
    JSON.stringify({
      isbn: String(isbn),
      cameraStatus: true,
    })
    : JSON.stringify({
      isbn: String(isbn),
      cameraStatus: false,
    });
  console.log(body);

  return fetch(`${API_ENDPOINT}/books`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body,
  });
};
