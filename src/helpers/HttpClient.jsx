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

//----------------
// ---------------OVERVIEW WIDGET
//----------------
// GET request to get the list of all the products
const getProducts = () => instance.get(
  'products',
  {
    params: {
      count: 50,
    },
  },
);

// GET request to get the product based on product_id
const getProduct = (productId) => instance.get(
  `products/${productId}`,
);

// GET request to get review metadata for a given product
const getReviewMeta = (productId) => instance.get('reviews/meta', {
  params: {
    product_id: productId,
  },
});

const getStyles = (productId) => instance.get(`/products/${productId}/styles`);

const getRelatedIds = (productId) => instance.get(`/products/${productId}/related`);

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

const getCart = () => instance.get('cart');

const postCart = (skuId, quantity) => instance.post('cart', {
  sku_id: skuId,
  count: quantity,
});

//----------------
// ---------------QUESTIONS AND ANSWERS WIDGET
//----------------
// GET request, Questions List
const getQuestions = (productId) => instance.get('/qa/questions', {
  params: {
    product_id: productId,
    page: 1,
    count: 100,
  },
});

// GET request, Answers List
const getAnswers = (questionId) => instance.get(`/qa/questions/${questionId}/answers`, {
  params: {
    question_id: questionId,
    page: 1,
    count: 100,
  },
});

// POST request, Add a Question
// eslint-disable-next-line camelcase
const addQuestion = (body, name, email, product_id) => instance.post('/qa/questions', {
  body,
  name,
  email,
  // eslint-disable-next-line camelcase
  product_id,
});

// POST request, Add an Answer
const addAnswer = (questionId, body, name, email, photos) => instance.post(
  `/qa/questions/${questionId}/answers`,
  {
    body,
    name,
    email,
    photos,
  },
);

// PUT request, Vote Question as Helpful
const voteQuestion = (questionId) => instance.put(
  `/qa/questions/${questionId}/helpful`,
);

// PUT request, Report Question
const reportQuestion = (questionId) => instance.put(
  `/qa/questions/${questionId}/report`,
);

// PUT request, Vote Answer as Helpful
const voteAnswer = (answerId) => instance.put(
  `/qa/answers/${answerId}/helpful`,
);

// PUT request, Report Answer
const reportAnswer = (answerId) => instance.put(
  `/qa/answers/${answerId}/report`,
);

module.exports = {
  getProducts,
  getReviewMeta,
  getProduct,
  getStyles,
  getQuestions,
  getAnswers,
  addQuestion,
  addAnswer,
  voteQuestion,
  reportQuestion,
  voteAnswer,
  reportAnswer,
  getRelatedIds,
  postCart,
  getCart,
};
