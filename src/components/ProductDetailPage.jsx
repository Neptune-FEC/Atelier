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
import RatingsAndReviews from './RatingsAndReviews';

const { averageRating } = require('../helpers/ProductHelper');
const {
  getProduct, getReviewMeta, getStyles, getReviews,
  addReview, postCart, postInteraction, getRelatedIds,
} = require('../helpers/HttpClient');

const testId = 66643; // QandA widget relying on this number to dynamically updatex

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
      noMoreReviews: true,
      numShownReviews: 0,
      skuId: null,
      selectedQuantity: null,
      selectedSize: null,
      isExpand: null,
      indexImage: null,
      indexThumbnail: null,
      indexStyleMapping: null,
      relatedProducts: [],
      isSizeDropdown: false,
      message: null,
    };
    this.fetchData = this.fetchData.bind(this);
    this.handleStyleSelect = this.handleStyleSelect.bind(this);
    this.handleSizeSelect = this.handleSizeSelect.bind(this);
    this.handleQuantitySelect = this.handleQuantitySelect.bind(this);
    this.handleExpand = this.handleExpand.bind(this);
    this.handleChangeReviewSort = this.handleChangeReviewSort.bind(this);
    this.handleAddNewReview = this.handleAddNewReview.bind(this);
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

  handleSubmit(id, selectedQuantity) {
    const {
      skuId,
    } = this.state;
    if (skuId) {
      this.handleQuantitySelect('-');
      this.handleSizeSelect(null);
      postCart(id, selectedQuantity);
    } else {
      this.setState({ message: 'Please select size' });
      this.toggleDropdown();
    }
  }

  handleChangeReviewSort(sort) {
    const { product, numReviews } = this.state;

    const reviewsParams = {
      product_id: product.id,
      count: numReviews,
      sort,
    };

    getReviews(reviewsParams).then((response) => {
      this.setState({
        reviews: response.data.results,
        reviewSort: sort,
        noMoreReviews: response.data.results.length <= 2,
        numShownReviews: (response.data.results.length > 2) ? 2 : response.data.results.length,
        // noMoreReviews: response.data.results.length === 0,
      });
    });
  }

  handleAddNewReview(params) {
    const { product, numReviews, reviewSort } = this.state;

    // console.log(params);

    addReview(
      params.product_id,
      params.rating,
      params.summary,
      params.body,
      params.recommend,
      params.name,
      params.email,
      params.photos,
      params.characteristics,
    ).then((response) => {
      if (response.status !== 201) {
        throw new Error(`POST response returned with status ${response.status}`);
      }

      const reviewsParams = {
        product_id: product.id,
        count: numReviews,
        reviewSort,
      };

      return getReviews(reviewsParams);
    }).then((response) => {
      if (response.status !== 200) {
        throw new Error(`GET response returned with status ${response.status}`);
      }

      this.setState({
        reviews: response.data.results,
        reviewSort,
        noMoreReviews: response.data.results.length <= 2,
        numShownReviews: (response.data.results.length > 2) ? 2 : response.data.results.length,
      });
    }).catch((err) => {
      console.warn('Add New Review error: ', err);
    });
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

  getMoreReviews() {
    const { numShownReviews, reviews } = this.state;

    if (numShownReviews < reviews.length) {
      this.setState({
        numShownReviews: numShownReviews + 2,
        noMoreReviews: (numShownReviews + 2) >= reviews.length,
      });
    }
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
    })
      .then(() => this.updateRelatedList());
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

    const defaultSort = 'relevant';

    getReviewMeta(productId).then((reviewMeta) => {
      const { totalCount, avgRating } = averageRating(reviewMeta.data.ratings);
      this.setState({
        reviewMeta: reviewMeta.data,
        starRating: avgRating,
        numReviews: totalCount,
      });

      const reviewsParams = {
        product_id: productId,
        count: totalCount,
        sort: defaultSort,
      };

      return getReviews(reviewsParams);
    }).then((response) => {
      this.setState({
        reviews: response.data.results,
        numShownReviews: 2,
        reviewSort: defaultSort,
        noMoreReviews: response.data.results.length <= 2,
      });
    });

    // console.log('getReviews params:');
    // console.log(reviewsParams);
    // getReviews(reviewsParams).then((response) => {
    //   // console.log('getReviews response:');
    //   // console.log(response.data);
    //   this.setState({
    //     reviews: response.data.results,
    //     reviewsPage: 1,
    //     noMoreReviews: response.data.results.length === 0,
    //   });
    // });

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

  updateRelatedList() {
    const { product } = this.state;

    getRelatedIds(product.id)
      .then((idList) => {
        idList.data.forEach((id, index) => {
          // sometimes the API includes a product as a related item to itself
          // this removes the same product id from its related items to reduce API calls
          if (id === product.id) {
            idList.data.splice(index, 1);
          }

          // this removes duplicates from the related ID's to reduce API calls
          const shallowCopy = [...idList.data];
          shallowCopy.splice(index, 1);
          const idx = shallowCopy.indexOf(id);
          if (idx > -1) {
            idList.data.splice(idx, 1);
          }
        });
        const promises = idList.data.map((id) => getProduct(id).then((result) => result.data));
        Promise.all(promises).then((result) => this.setRelatedProducts(result));
      });
  }

  setRelatedProducts(relatedProducts) {
    const promises = relatedProducts.map((item) => getReviewMeta(item.id)
      .then((result) => result.data.ratings));
    Promise.all(promises).then((result) => {
      relatedProducts.forEach((relatedProd, i) => {
        const { totalCount, avgRating } = averageRating(result[i]);
        relatedProd.rating = { totalCount, avgRating };
      });
    })
      .then(() => {
        this.setState({
          relatedProducts,
        });
      })
      .catch((error) => console.log('Too many requests', error));
  }

  render() {
    const {
      product, starRating, reviewMeta, numReviews, relatedProducts,
      styles, selectedStyle, selectedSize, skuId, selectedQuantity, isExpand,
      reviews, reviewSort, noMoreReviews, numShownReviews,
      indexImage, indexThumbnail, indexStyleMapping, isSizeDropdown, message,
    } = this.state;
    const skus = selectedStyle ? selectedStyle.skus : '';

    return (
      <>
        <header>
          <h1>Look#</h1>
        </header>
        {(relatedProducts[0] && indexStyleMapping)
          ? (
            <>
              <Overview
                styles={styles}
                selectedStyle={selectedStyle}
                handleClick={this.handleClick}
              >
                <ImageGallery
                  product={product}
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
                />
                <ProductTitle product={product} />
                <ProductPrice selectedStyle={selectedStyle} />
                <StyleSelector
                  product={product}
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
                    isSizeDropdown={isSizeDropdown}
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
                <ShareOnSocialMedia product={product} />
                <ProductOverview product={product} />
              </Overview>
              <RelatedItemsWidget
                handleClick={this.handleClick}
                product={product}
                starRating={starRating}
                numReviews={numReviews}
                reviewMeta={reviewMeta}
                styles={styles}
                fetchData={this.fetchData}
                relatedProducts={relatedProducts}
              />
              <QandA
                product={product}
                handleClick={this.handleClick}
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
                    setIndexThumbnail={this.setIndexThumbnail}
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
                handleAddNewReview={this.handleAddNewReview}
                getMoreReviews={this.getMoreReviews}
                numShownReviews={numShownReviews}
                productName={product.name}
                productId={product.id}
              />
            </>
          )
          : <div>Loading Neptune!!!</div>}
      </>
    );
  }
}

export default ProductDetailPage;
