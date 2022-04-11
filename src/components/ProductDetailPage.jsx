import React from 'react';
import Overview from './Overview/Overview';
import ExpandView from './Overview/ExpandView';
import RelatedItemsWidget from './RelatedItems/RelatedItemsWidget';
import QandA from './QandA/QandA';
import RatingsAndReviews from './RatingsAndReviews';

const { averageRating } = require('../helpers/ProductHelper');
const {
  getProduct, getReviewMeta, getStyles, getReviews
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
      reviews: [],
      reviewsPage: 0,
      reviewSort: 'relevant',
      noMoreReviews: false,
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
    this.handleChangeReviewSort = this.handleChangeReviewSort.bind(this);
    this.getMoreReviews = this.getMoreReviews.bind(this);
  }

  componentDidMount() {
    // const { product } = this.state;
    // const productId = product ? product.id : testId;
    // this.fetchData(productId);
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

  handleChangeReviewSort(sort) {
    const { product } = this.state;

    const reviewsParams = {
      product_id: product.id,
      page: 1,
      count: 2,
      sort,
    };

    // console.log('getReviews params:');
    // console.log(reviewsParams);
    getReviews(reviewsParams).then((response) => {
      // console.log('getReviews response:');
      // console.log(response.data);
      this.setState({
        reviews: response.data.results,
        reviewsPage: 1,
        reviewSort: sort,
        noMoreReviews: response.data.results.length === 0,
      });
    });
  }

  getMoreReviews() {
    let { reviewsPage, reviews } = this.state;
    const { product, reviewSort } = this.state;

    reviewsPage += 1;

    const reviewsParams = {
      product_id: product.id,
      page: reviewsPage,
      count: 2,
      sort: reviewSort,
    };

    // console.log('getReviews params:');
    // console.log(reviewsParams);
    getReviews(reviewsParams).then((response) => {
      // console.log('getReviews response:');
      // console.log(response.data);

      reviews = reviews.concat(response.data.results);

      this.setState({
        reviews,
        reviewsPage,
        noMoreReviews: response.data.results.length === 0,
      });
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

    const { reviewSort } = this.state;

    const reviewsParams = {
      product_id: productId,
      page: 1,
      count: 2,
      sort: reviewSort,
    };

    // console.log('getReviews params:');
    // console.log(reviewsParams);
    getReviews(reviewsParams).then((response) => {
      // console.log('getReviews response:');
      // console.log(response.data);
      this.setState({
        reviews: response.data.results,
        reviewsPage: 1,
        noMoreReviews: response.data.results.length === 0,
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
      reviews, reviewSort, noMoreReviews,
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
              <RatingsAndReviews
                reviewMeta={reviewMeta}
                avgRating={starRating}
                numReviews={numReviews}
                reviews={reviews}
                reviewSort={reviewSort}
                noMoreReviews={noMoreReviews}
                handleChangeReviewSort={this.handleChangeReviewSort}
                getMoreReviews={this.getMoreReviews}
              />
            </>
          )
          : <div> loading</div>}
      </>
    );
  }
}

export default ProductDetailPage;
