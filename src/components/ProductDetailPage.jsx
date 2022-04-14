import React from 'react';
import Overview from './Overview/Overview';
import ExpandView from './Overview/ExpandView';
import RelatedItemsWidget from './RelatedItems/RelatedItemsWidget';
import QandA from './QandA/QandA';
import RatingsAndReviews from './RatingsAndReviews';

const { averageRating } = require('../helpers/ProductHelper');
const {
  getProduct, getReviewMeta, getStyles, getReviews, getRelatedIds
} = require('../helpers/HttpClient');

const testId = 66642; // QandA widget relying on this number to dynamically update

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
      relatedProducts: [],
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
    this.fetchData(testId); // after initial rendering, what action updates id# to user choice?

    this.handleIndexImageRight = this.handleIndexImageRight.bind(this);
    this.handleIndexImageLeft = this.handleIndexImageLeft.bind(this);
    this.handleIndexThumbnailDown = this.handleIndexThumbnailDown.bind(this);
    this.handleIndexThumbnailTop = this.handleIndexThumbnailTop.bind(this);
    this.setIndexImage = this.setIndexImage.bind(this);
    this.handleIndexStyleMapping = this.handleIndexStyleMapping.bind(this);
    this.setIndexThumbnail = this.setIndexThumbnail.bind(this);
  }

  handleIndexStyleMapping(indexImage, styleId) {
    const { indexStyleMapping } = this.state;
    indexStyleMapping[styleId] = indexImage;
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
          mapping[style_id] = 0;
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
      reviews, reviewSort, noMoreReviews, indexImage, indexThumbnail, indexStyleMapping,
    } = this.state;

    return (
      <>
        <header>
          <h1>Look#</h1>
        </header>
        {(relatedProducts[0] && indexStyleMapping)
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
                handleIndexThumbnailTop={this.handleIndexThumbnailTop}
                handleIndexThumbnailDown={this.handleIndexThumbnailDown}
                handleIndexImageLeft={this.handleIndexImageLeft}
                handleIndexImageRight={this.handleIndexImageRight}
                indexImage={indexImage}
                indexThumbnail={indexThumbnail}
                setIndexImage={this.setIndexImage}
                indexStyleMapping={indexStyleMapping}
                handleIndexStyleMapping={this.handleIndexStyleMapping}
                setIndexThumbnail={this.setIndexThumbnail}
              />
              <RelatedItemsWidget
                product={product}
                starRating={starRating}
                numReviews={numReviews}
                reviewMeta={reviewMeta}
                styles={styles}
                fetchData={this.fetchData}
                relatedProducts={relatedProducts}
              />
              <QandA product={product} />
              {isExpand
                && (
                  <ExpandView
                    indexImage={indexImage}
                    selectedStyle={selectedStyle}
                    handleExpand={this.handleExpand}
                    handleIndexImageLeft={this.handleIndexImageLeft}
                    handleIndexImageRight={this.handleIndexImageRight}
                    product={product}
                    setIndexImage={this.setIndexImage}
                    handleIndexStyleMapping={this.handleIndexStyleMapping}
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
