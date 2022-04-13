import React from 'react';
import Overview from './Overview/Overview';
import ExpandView from './Overview/ExpandView';
import RelatedItemsWidget from './RelatedItems/RelatedItemsWidget';
import QandA from './QandA/QandA';
import ImageGallery from './Overview/ImageGallery';
import StarRating from './Overview/StarRating';
import ProductTitle from './Overview/ProductTitle';
import ProductPrice from './Overview/ProductPrice';
import StyleSelector from './Overview/StyleSelector';
import AddToCart from './Overview/AddToCart';
import SizeSelector from './Overview/SizeSelector';
import QuantitySelector from './Overview/QuantitySelector';
import ShareOnSocialMedia from './Overview/ShareOnSocialMedia';
import ProductOverview from './Overview/ProductOverview';
import { postInteraction } from '../helpers/HttpClient';
import RatingsAndReviews from './RatingsAndReviews';

const { averageRating } = require('../helpers/ProductHelper');
const {
  getProduct, getReviewMeta, getStyles, getReviews, postCart,
} = require('../helpers/HttpClient');

const testId = 66642; // QandA widget relying on this number to dynamically updatex

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
      indexImage: null,
      indexThumbnail: null,
      indexStyleMapping: null,
      isSizeDropdown: false,
      message: null,
    };
    this.fetchData = this.fetchData.bind(this);
    this.handleStyleSelect = this.handleStyleSelect.bind(this);
    this.handleSizeSelect = this.handleSizeSelect.bind(this);
    this.handleQuantitySelect = this.handleQuantitySelect.bind(this);
    this.handleExpand = this.handleExpand.bind(this);
    this.handleChangeReviewSort = this.handleChangeReviewSort.bind(this);
    this.getMoreReviews = this.getMoreReviews.bind(this);
    this.handleIndexImageRight = this.handleIndexImageRight.bind(this);
    this.handleIndexImageLeft = this.handleIndexImageLeft.bind(this);
    this.handleIndexThumbnailDown = this.handleIndexThumbnailDown.bind(this);
    this.handleIndexThumbnailTop = this.handleIndexThumbnailTop.bind(this);
    this.setIndexImage = this.setIndexImage.bind(this);
    this.handleIndexStyleMapping = this.handleIndexStyleMapping.bind(this);
    this.setIndexThumbnail = this.setIndexThumbnail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.setMessage = this.setMessage.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.fetchData(testId); // after initial rendering, what action updates id# to user choice?
  }

  handleClick(e, component) {
    let elementSelector = e.target.tagName;
    if (e.target.id) {
      elementSelector += `#${e.target.id}`;
    }
    const classes = e.target.className.trim().split(/\s+/).join('.');
    if (classes) {
      elementSelector += `.${classes}`;
    } else {
      elementSelector += classes;
    }

    postInteraction(elementSelector, component, new Date().toISOString()).then((response) => {
      console.log(response);
    });
  }

  handleIndexStyleMapping(indexImage, indexThumbnail, styleId) {
    const { indexStyleMapping } = this.state;
    indexStyleMapping[styleId] = [indexImage, indexThumbnail];
    this.setState({
      indexStyleMapping,
    });
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
    const { isExpand, indexImage } = this.state;
    this.setState({
      isExpand: !isExpand,
    }, () => {
      if (this.state.isExpand) {
        document.getElementById(`expand${indexImage}`).scrollIntoView({ inline: 'center', block: 'nearest' });
      }
    });
  }

  handleIndexImageRight() {
    const { indexImage } = this.state;
    this.setState({
      indexImage: indexImage + 1,
    });
  }

  handleIndexImageLeft() {
    const { indexImage } = this.state;
    this.setState({
      indexImage: indexImage - 1,
    });
  }

  handleIndexThumbnailDown() {
    const { indexThumbnail } = this.state;
    this.setState({
      indexThumbnail: indexThumbnail + 1,
    });
  }

  handleIndexThumbnailTop() {
    const { indexThumbnail } = this.state;
    this.setState({
      indexThumbnail: indexThumbnail - 1,
    });
  }

  handleSubmit(id, selectedQuantity, selectedSize) {
    const {
      skuId, handleQuantitySelect, handleSizeSelect,
    } = this.props;
    if (skuId) {
      handleQuantitySelect('-');
      handleSizeSelect(null);
    } else {
      this.setState({ message: 'Please select size' });
      this.toggleDropdown();
    }
    postCart(id, selectedQuantity);
  }

  setIndexImage(indexImage) {
    this.setState({
      indexImage,
    });
  }

  setIndexThumbnail(indexThumbnail) {
    this.setState({
      indexThumbnail,
    });
  }

  setMessage() {
    this.setState({
      message: null,
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

    getReviews(reviewsParams).then((response) => {
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

    getReviews(reviewsParams).then((response) => {
      reviews = reviews.concat(response.data.results);
      this.setState({
        reviews,
        reviewsPage,
        noMoreReviews: response.data.results.length === 0,
      });
    });
  }

  toggleDropdown() {
    const { isSizeDropdown } = this.state;
    this.setState({
      isSizeDropdown: !isSizeDropdown,
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
      }, () => {
        const { styles } = this.state;
        const { results } = styles;
        const mapping = {};
        for (let i = 0; i < results.length; i += 1) {
          const style = results[i];
          const { style_id } = style;
          mapping[style_id] = [0, 1];
          this.setState({
            indexStyleMapping: mapping,
          });
        }
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

    getReviews(reviewsParams).then((response) => {
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
      indexImage: 0,
      indexThumbnail: 1,
    });
    const { product } = this.state;
    if (product) {
      document.getElementById('img_0').scrollIntoView({ inline: 'center', block: 'nearest' });
      document.getElementById('thumbnail_1').scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }

  render() {
    const {
      product, starRating, reviewMeta, numReviews,
      styles, selectedStyle, selectedSize,
      skuId, selectedQuantity, isExpand,
      indexImage, indexThumbnail, indexStyleMapping, isSizeDropdown, message,

      reviews, reviewSort, noMoreReviews,
    } = this.state;
    const skus = selectedStyle ? selectedStyle.skus : '';

    return (
      <>
        <header>
          <h1>Hello Neptune!!!</h1>
        </header>
        {(product && indexStyleMapping)
          ? (
            <>
              <Overview
                styles={styles}
                selectedStyle={selectedStyle}
                handleClick={this.handleClick}
              >
                <ImageGallery
                  handleClick={this.handleClick}
                  setIndexImage={this.setIndexImage}
                  selectedStyle={selectedStyle}
                  isExpand={isExpand}
                  handleExpand={this.handleExpand}
                  indexImage={indexImage}
                  indexThumbnail={indexThumbnail}
                  handleIndexThumbnailTop={this.handleIndexThumbnailTop}
                  handleIndexThumbnailDown={this.handleIndexThumbnailDown}
                  handleIndexImageLeft={this.handleIndexImageLeft}
                  handleIndexImageRight={this.handleIndexImageRight}
                  product={product}
                  indexStyleMapping={indexStyleMapping}
                  handleIndexStyleMapping={this.handleIndexStyleMapping}
                  setIndexThumbnail={this.setIndexThumbnail}
                />
                <StarRating
                  starRating={starRating}
                  numReviews={numReviews}
                  handleClick={this.handleClick}
                />
                <ProductTitle product={product} handleClick={this.handleClick} />
                <ProductPrice selectedStyle={selectedStyle} handleClick={this.handleClick} />
                <StyleSelector
                  handleClick={this.handleClick}
                  styles={styles}
                  selectedStyle={selectedStyle}
                  handleStyleSelect={this.handleStyleSelect}
                  handleSizeSelect={this.handleSizeSelect}
                  handleQuantitySelect={this.handleQuantitySelect}
                  indexStyleMapping={indexStyleMapping}
                  setIndexImage={this.setIndexImage}
                  setIndexThumbnail={this.setIndexThumbnail}
                  handleIndexStyleMapping={this.handleIndexStyleMapping}
                  indexThumbnail={indexThumbnail}
                  indexImage={indexImage}
                />
                <AddToCart
                  handleClick={this.handleClick}
                  selectedStyle={selectedStyle}
                  isSizeDropdown={isSizeDropdown}
                  message={message}
                  handleSubmit={this.handleSubmit}
                  skuId={skuId}
                  selectedQuantity={selectedQuantity}
                  selectedSize={selectedSize}
                >
                  <SizeSelector
                    selectedStyle={selectedStyle}
                    selectedSize={selectedSize}
                    skus={skus}
                    handleSizeSelect={this.handleSizeSelect}
                    handleQuantitySelect={this.handleQuantitySelect}
                    isSizeDropdown={this.isSizeDropdown}
                    toggleDropdown={this.toggleDropdown}
                    setMessage={this.setMessage}
                  />
                  <QuantitySelector
                    skuId={skuId}
                    skus={skus}
                    handleQuantitySelect={this.handleQuantitySelect}
                    selectedQuantity={selectedQuantity}
                  />
                </AddToCart>
                <ShareOnSocialMedia product={product} handleClick={this.handleClick} />
                <ProductOverview product={product} handleClick={this.handleClick} />
              </Overview>
              <RelatedItemsWidget
                product={product}
                starRating={starRating}
                numReviews={numReviews}
                reviewMeta={reviewMeta}
                styles={styles}
                selectedStyle={selectedStyle}
                fetchData={this.fetchData}
              />
              <QandA
                product={product}
              />
              {isExpand
                && (
                  <ExpandView
                    handleClick={this.handleClick}
                    indexImage={indexImage}
                    selectedStyle={selectedStyle}
                    handleExpand={this.handleExpand}
                    handleIndexImageLeft={this.handleIndexImageLeft}
                    handleIndexImageRight={this.handleIndexImageRight}
                    product={product}
                    setIndexImage={this.setIndexImage}
                    handleIndexStyleMapping={this.handleIndexStyleMapping}
                    handleIndexThumbnailTop={this.handleIndexThumbnailTop}
                    handleIndexThumbnailDown={this.handleIndexThumbnailDown}
                    indexThumbnail={indexThumbnail}
                  />
                )}
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
          : <div>Loading Neptune!!!</div>}
      </>
    );
  }
}

export default ProductDetailPage;
