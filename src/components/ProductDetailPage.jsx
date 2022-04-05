import React from 'react';
import Overview from './Overview/Overview';
<<<<<<< HEAD
import QandA from './QandA/QandA';
=======
import RelatedItemsWidget from './RelatedItems/RelatedItemsWidget';
>>>>>>> e9ca6320f018e3289960b8c83d1f1abb7bc184f7

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
      starRating: 0,
      numReviews: 0,
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
          <div>
<<<<<<< HEAD
            {/* <Overview
=======
            <Overview
>>>>>>> e9ca6320f018e3289960b8c83d1f1abb7bc184f7
              product={product}
              starRating={starRating}
              numReviews={numReviews}
              reviewMeta={reviewMeta}
<<<<<<< HEAD
            /> */}
            <QandA product={product} />
=======
            />
            <RelatedItemsWidget
              product={product}
              starRating={starRating}
              numReviews={numReviews}
              reviewMeta={reviewMeta}
            />
>>>>>>> e9ca6320f018e3289960b8c83d1f1abb7bc184f7
          </div>
        )
        : <div> loading</div>
      )
    );
  }
}

export default ProductDetailPage;
