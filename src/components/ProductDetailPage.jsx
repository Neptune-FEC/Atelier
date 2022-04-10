import React from 'react';
import Overview from './Overview/Overview';
import ExpandView from './Overview/ExpandView';
import RelatedItemsWidget from './RelatedItems/RelatedItemsWidget';
import QandA from './QandA/QandA';

const { averageRating } = require('../helpers/ProductHelper');
const {
  getProduct, getReviewMeta, getStyles,
} = require('../helpers/HttpClient');

const testId = 66642;

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
    this.fetchData(testId);
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
      <>
        <header>
          <h1>Hello Neptune!!!</h1>
        </header>
        {Object.keys(product).length && Object.keys(reviewMeta).length && starRating && numReviews
          ? (
            <>
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
                fetchData={this.fetchData}
              />
              <br />
              <QandA product={product} />
              {/* <ExpandView selectedStyle={selectedStyle} /> */}
            </>
          )
          : <div> loading</div>}
      </>
    );
  }
}

export default ProductDetailPage;
