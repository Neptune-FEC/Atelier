const sum = require('./example.sum');

// To run tests in terminal:
// npm run test

// script has been added to package.json

// A PASSING TEST
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

// A FAILING TEST
test('this test should fail', () => {
  expect(sum(1, 2)).toBe(4);
});
