const axios = require('axios');

// eslint-disable-next-line prefer-destructuring
const URL = process.env.URL;
// eslint-disable-next-line prefer-destructuring
const TOKEN = process.env.TOKEN;

// Base http request used by all the http calls
const instance = axios.create({
  baseURL: URL,
  headers: { Authorization: TOKEN },
});

// GET request to get the list of all the products
const getProducts = () => instance.get(
  'products',
);

// GET request to get the product based on product_id
const getProduct = (productId) => instance.get(
  `products/${productId}`,
);

// GEt request to get review metadata for a given product
const getReviewMeta = (productId) => instance.get('reviews/meta', {
  params: {
    product_id: productId,
  },
});

const getStyles = (productId) => instance.get(`/products/${productId}/styles`);

// const postReview = (productId) => instance.post('reviews', {
//   product_id: productId,
//   summary: 'testing2',
//   body: 'testing2',
//   recommend: true,
//   name: 'test',
//   email: 'test@yahoo.com',
//   photos: ['https://images.unsplash.com/photo-1519857609704-61…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80'],
//   characteristics: { 14: 5, 15: 5 },
// });

module.exports = {
  getProducts,
  getReviewMeta,
  getProduct,
  getStyles,
};
