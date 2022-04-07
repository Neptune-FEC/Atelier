import React from 'react';
import Overview from './Overview/Overview';
import RelatedItemsWidget from './RelatedItems/RelatedItemsWidget';
import QandA from './QandA/QandA';

const { averageRating } = require('../helpers/ProductHelper');

const {
  getProduct, getReviewMeta, getStyles,
} = require('../helpers/HttpClient');

class ProductDetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      reviewMeta: {},
      styles: {},
      selectedStyle: {},
      starRating: 0,
      numReviews: 0,
    };
    this.fetchData = this.fetchData.bind(this);
    this.handleStyleSelect = this.handleStyleSelect.bind(this);
  }

  componentDidMount() {
    this.fetchData(66642);
  }

  handleStyleSelect(style) {
    this.setState({
      selectedStyle: style,
    });
  }

  fetchData(productId) {
    getProduct(productId).then((product) => {
      this.setState({
        product: product.data,
      });
    });
    getStyles(productId).then((response) => {
      this.setState({
        styles: response.data,
        selectedStyle: response.data.results[0],
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
      product, starRating, reviewMeta, numReviews, styles, selectedStyle,
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
                styles={styles}
                selectedStyle={selectedStyle}
                handleStyleSelect={this.handleStyleSelect}
              />
              <RelatedItemsWidget
                product={product}
                starRating={starRating}
                numReviews={numReviews}
                reviewMeta={reviewMeta}
                styles={styles}
                selectedStyle={selectedStyle}
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
