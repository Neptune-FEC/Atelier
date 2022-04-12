import React from 'react';
import RelatedProductsList from './RelatedProductsList';
import YourOutfitList from './YourOutfitList';

// const { averageRating } = require('../../helpers/ProductHelper');
// const {
//   getProduct, getRelatedIds, getReviewMeta,
// } = require('../../helpers/HttpClient');

class RelatedItemsWidget extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentProduct: null,
      productsToDisplay: [],
      relatedProducts: [],
      index: 0,
    };

    this.cycleRight = this.cycleRight.bind(this);
    this.cycleLeft = this.cycleLeft.bind(this);
    this.setInitialState = this.setInitialState.bind(this);
  }

  componentDidMount() {
    const { relatedProducts, product } = this.props;

    this.setState({
      currentProduct: product,
      productsToDisplay: relatedProducts.slice(0, 4),
      relatedProductsForCards: relatedProducts,
    });
  }

  componentDidUpdate() {
    const { relatedProducts } = this.props;
    const { relatedProductsForCards } = this.state;
    if (relatedProductsForCards.length) {
      if (relatedProducts[0].id !== relatedProductsForCards[0].id) {
        this.setState({
          productsToDisplay: relatedProducts.slice(0, 4),
          relatedProductsForCards: relatedProducts,
          index: 0,
        });
      }
    }
  }

  setInitialState() {
    const { relatedProducts } = this.props;
    this.setState({
      productsToDisplay: relatedProducts.slice(0, 4),
      index: 0,
    });
  }

  cycleRight() {
    let { index } = this.state;
    const { relatedProducts } = this.props;
    index += 1;

    this.setState({
      productsToDisplay: relatedProducts.slice(index, index + 4),
      index,
    });
  }

  cycleLeft() {
    let { index } = this.state;
    const { relatedProducts } = this.props;
    index -= 1;

    this.setState({
      productsToDisplay: relatedProducts.slice(index, index + 4),
      index,
    });
  }

  render() {
    const {
      productsToDisplay, index,
    } = this.state;
    const {
      fetchData, starRating, numReviews, relatedProducts, product,
    } = this.props;

    const displayRightArrow = !(relatedProducts.length - index === 4);
    const displayLeftArrow = (index > 0);

    return (

      relatedProducts[0].rating
        ? (
          <div>
            <h3 className="related-title">Customers also bought these items</h3>
            <div>
              <RelatedProductsList
                currentProduct={product}
                relatedProducts={productsToDisplay}
                displayRightArrow={displayRightArrow}
                displayLeftArrow={displayLeftArrow}
                cycleRight={this.cycleRight}
                cycleLeft={this.cycleLeft}
                fetchData={fetchData}
                setInitialState={this.setInitialState}
              />
            </div>
            <h3 className="related-title">Your Outfit</h3>
            <div>
              <YourOutfitList
                currentProduct={product}
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
