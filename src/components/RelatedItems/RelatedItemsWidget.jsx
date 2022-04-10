import React from 'react';
import RelatedProductsList from './RelatedProductsList';
import YourOutfitList from './YourOutfitList';

const { averageRating } = require('../../helpers/ProductHelper');
const {
  getProduct, getRelatedIds, getReviewMeta,
} = require('../../helpers/HttpClient');

class RelatedItemsWidget extends React.Component {
  constructor(props) {
    super(props);
    const { product } = this.props;
    this.state = {
      currentProduct: product,
      relatedProducts: ['null'],
      productsToDisplay: [],
      index: 0,
    };

    this.cycleRight = this.cycleRight.bind(this);
    this.cycleLeft = this.cycleLeft.bind(this);
  }

  componentDidMount() {
    this.updateRelatedList();
  }

  componentDidUpdate(prevProps, prevState) {
    this.updateRelatedList(prevState.currentProduct.id);
  }

  setRelatedProducts(relatedProducts) {
    const { product } = this.props;

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
          currentProduct: product,
          relatedProducts,
          productsToDisplay: relatedProducts.slice(0, 4),
        });
      });
  }

  updateRelatedList(prevState) {
    const { product } = this.props;

    if (prevState === product.id) {
      return;
    }

    getRelatedIds(product.id)
      .then((idList) => {
        const promises = idList.data.map((id) => getProduct(id).then((result) => result.data));
        Promise.all(promises).then((result) => this.setRelatedProducts(result));
      });
  }

  cycleRight() {
    let { index } = this.state;
    const { relatedProducts } = this.state;
    index += 1;

    this.setState({
      productsToDisplay: relatedProducts.slice(index, index + 4),
      index,
    });
  }

  cycleLeft() {
    let { index } = this.state;
    const { relatedProducts } = this.state;
    index -= 1;

    this.setState({
      productsToDisplay: relatedProducts.slice(index, index + 4),
      index,
    });
  }

  render() {
    const {
      relatedProducts, productsToDisplay, currentProduct,
      index,
    } = this.state;
    const { fetchData, starRating, numReviews } = this.props;

    const displayRightArrow = !(relatedProducts.length - index === 4);
    const displayLeftArrow = (index > 0);

    return (

      relatedProducts[0].rating
        ? (
          <div>
            <h2>Related Items & Comparison</h2>
            <div>
              <RelatedProductsList
                currentProduct={currentProduct}
                relatedProducts={productsToDisplay}
                displayRightArrow={displayRightArrow}
                displayLeftArrow={displayLeftArrow}
                cycleRight={this.cycleRight}
                cycleLeft={this.cycleLeft}
                fetchData={fetchData}
              />
            </div>
            <div>
              <YourOutfitList
                currentProduct={currentProduct}
                starRating={starRating}
                numReviews={numReviews}
              />
            </div>
          </div>
        )
        : <div>loading...</div>

    );
  }
}

export default RelatedItemsWidget;
