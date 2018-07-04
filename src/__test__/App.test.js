// import React from 'react';
// import App from '../App';
//
// import renderer from 'react-test-renderer';
//
// it('renders without crashing', () => {
//   const rendered = renderer.create(<App />).toJSON();
//   expect(rendered).toBeTruthy();
// });

const sum = (a, b) => a + b;

test('sum', () => {
  expect(sum(1, 2)).toBe(3);
});
