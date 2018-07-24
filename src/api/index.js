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
