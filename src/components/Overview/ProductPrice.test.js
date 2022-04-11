// // import dependencies
// import React from 'react';
// import { getProduct } from '../../helpers/HttpClient';

// // import react-testing methods
// import {
//   render, fireEvent, waitFor, screen,
// } from '@testing-library/react';

// // add custom jest matchers from jest-dom
// import '@testing-library/jest-dom';
// // the component to test
// import ProductPrice from './ProductPrice';

// test('loads and displays greeting', async () => {
//   // Arrange
//   // Act
//   // Assert
// });

// // declare which API requests to mock
// const server = setupServer(
//   const name = getProduct(66642).then((response) => {
//     return response.data.name;
//   })
//   // capture "GET /greeting" requests
//   rest.get('/greeting', (req, res, ctx) => {
//     // respond using a mocked JSON body
//     return res(ctx.json({ greeting: 'hello there' }))
//   }),
// )

// // establish API mocking before all tests
// beforeAll(() => server.listen())
// // reset any request handlers that are declared as a part of our tests
// // (i.e. for testing one-time error scenarios)
// afterEach(() => server.resetHandlers())
// // clean up once the tests are done
// afterAll(() => server.close())

// // ...

// test('handlers server error', async () => {
//   server.use(
//     // override the initial "GET /greeting" request handler
//     // to return a 500 Server Error
//     rest.get('/greeting', (req, res, ctx) => {
//       return res(ctx.status(500))
//     }),
//   )

//   // ...
// })

// render(<Fetch url="/greeting" />)

// fireEvent.click(screen.getByText('Load Greeting'))

// // wait until the `get` request promise resolves and
// // the component calls setState and re-renders.
// // `waitFor` waits until the callback doesn't throw an error

// await waitFor(() =>
//   // getByRole throws an error if it cannot find an element
//   screen.getByRole('heading'),

//   // assert that the alert message is correct using
//   // toHaveTextContent, a custom matcher from jest-dom.
//   expect(screen.getByRole('alert')).toHaveTextContent('Oops, failed to fetch!')

// // assert that the button is not disabled using
// // toBeDisabled, a custom matcher from jest-dom.
// expect(screen.getByRole('button')).not.toBeDisabled()
