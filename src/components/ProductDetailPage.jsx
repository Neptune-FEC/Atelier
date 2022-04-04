import React from 'react';
import Overview from './Overview/Overview';

const { averageRating } = require('../helpers/ProductHelper');

const {
  getProduct, getReviewMeta,
} = require('../helpers/HttpClient');

class ProductDetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      reviewMeta: {},
      numReviews: 0,
      starRating: 0,
    };
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData(66742);
  }

  fetchData(productId) {
    getProduct(productId).then((product) => {
      this.setState({
        product: product.data,
      });
    });
    getReviewMeta(productId).then((reviewMeta) => {
      const { totalCount, avgRating } = averageRating(reviewMeta.data.ratings);
      this.setState({
        reviewMeta: reviewMeta.data,
        starRating: avgRating,
        numReviews: totalCount,
      });
    });
  }

  render() {
    const {
      product, starRating, reviewMeta, numReviews,
    } = this.state;
    return (
      (Object.keys(product).length && Object.keys(reviewMeta).length && starRating && numReviews
        ? (
          <Overview
            product={product}
            starRating={starRating}
            numReviews={numReviews}
            reviewMeta={reviewMeta}
          />
        )
        : <div> loading</div>
      )
    );
  }
}

export default ProductDetailPage;
