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
      indexImage: null,
      indexThumbnail: null,
      indexStyleMapping: null,
    };
    this.fetchData = this.fetchData.bind(this);
    this.handleStyleSelect = this.handleStyleSelect.bind(this);
    this.handleSizeSelect = this.handleSizeSelect.bind(this);
    this.handleQuantitySelect = this.handleQuantitySelect.bind(this);
    this.handleExpand = this.handleExpand.bind(this);
    this.handleIndexImageRight = this.handleIndexImageRight.bind(this);
    this.handleIndexImageLeft = this.handleIndexImageLeft.bind(this);
    this.handleIndexThumbnailDown = this.handleIndexThumbnailDown.bind(this);
    this.handleIndexThumbnailTop = this.handleIndexThumbnailTop.bind(this);
    this.setIndexImage = this.setIndexImage.bind(this);
    this.handleIndexStyleMapping = this.handleIndexStyleMapping.bind(this);
    this.setIndexThumbnail = this.setIndexThumbnail.bind(this);
  }

  componentDidMount() {
    this.fetchData(testId);
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
      indexImage, indexThumbnail, indexStyleMapping,
    } = this.state;
    return (
      <>
        <header>
          <h1>Hello Neptune!!!</h1>
        </header>
        {(product && indexStyleMapping)
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
                selectedStyle={selectedStyle}
                fetchData={this.fetchData}
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
                  />
                )}
            </>
          )
          : <div> loading</div>}
      </>
    );
  }
}

export default ProductDetailPage;
