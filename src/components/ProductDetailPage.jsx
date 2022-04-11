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
      product: null,
      reviewMeta: null,
      styles: null,
      selectedStyle: null,
      starRating: null,
      numReviews: null,
      skuId: null,
      selectedQuantity: null,
      selectedSize: null,
      isExpand: null,
    };
    this.fetchData = this.fetchData.bind(this);
    this.handleStyleSelect = this.handleStyleSelect.bind(this);
    this.handleSizeSelect = this.handleSizeSelect.bind(this);
    this.handleQuantitySelect = this.handleQuantitySelect.bind(this);
    this.handleExpand = this.handleExpand.bind(this);
  }

  componentDidMount() {
    this.fetchData(testId);
  }

  handleStyleSelect(style) {
    this.setState({
      selectedStyle: style,
    });
  }

  handleSizeSelect(selectedSize, skuId) {
    this.setState({
      selectedSize,
      skuId,
    });
  }

  handleQuantitySelect(selectedQuantity) {
    this.setState({
      selectedQuantity,
    });
  }

  handleExpand() {
    console.log('expand expand');
    const { isExpand } = this.state;
    this.setState({
      isExpand: !isExpand,
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
    this.setState({
      skuId: null,
      selectedQuantity: null,
      selectedSize: null,
      isExpand: false,
    });
  }

  render() {
    const {
      product, starRating, reviewMeta, numReviews,
      styles, selectedStyle, selectedSize, skuId, selectedQuantity, isExpand,
    } = this.state;
    return (
      <>
        <header>
          <h1>Hello Neptune!!!</h1>
        </header>
        {(product)
          ? (
            <>
              <Overview
                product={product}
                starRating={starRating}
                numReviews={numReviews}
                reviewMeta={reviewMeta}
                styles={styles}
                selectedStyle={selectedStyle}
                selectedSize={selectedSize}
                skuId={skuId}
                selectedQuantity={selectedQuantity}
                handleSizeSelect={this.handleSizeSelect}
                handleQuantitySelect={this.handleQuantitySelect}
                handleStyleSelect={this.handleStyleSelect}
                isExpand={isExpand}
                handleExpand={this.handleExpand}
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
              {isExpand
                && <ExpandView selectedStyle={selectedStyle} handleExpand={this.handleExpand} />}
            </>
          )
          : <div>Loading Neptune!!!</div>}
      </>
    );
  }
}

export default ProductDetailPage;
