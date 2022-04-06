import React from 'react';
import Overview from './Overview/Overview';
import RelatedItemsWidget from './RelatedItems/RelatedItemsWidget';
import QandA from './QandA/QandA';

const { averageRating } = require('../helpers/ProductHelper');

const {
  getProduct, getReviewMeta, getProducts,
} = require('../helpers/HttpClient');

class ProductDetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      reviewMeta: {},
      starRating: 0,
      numReviews: 0,
    };
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData(66642);
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
      <div className="main">
        <div className="header">Hello Neptune!!!</div>
        {Object.keys(product).length && Object.keys(reviewMeta).length && starRating && numReviews
          ? (
            <div>
              <Overview
                product={product}
                starRating={starRating}
                numReviews={numReviews}
                reviewMeta={reviewMeta}
              />
              <RelatedItemsWidget
                product={product}
                starRating={starRating}
                numReviews={numReviews}
                reviewMeta={reviewMeta}
              />
              <QandA product={product} />
            </div>
          )
          : <div> loading</div>}
      </div>
    );
  }
}

export default ProductDetailPage;
