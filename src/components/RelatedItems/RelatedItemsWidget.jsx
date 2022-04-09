import React from 'react';
import RelatedProductsList from './RelatedProductsList';

const {
  getProduct, getRelatedIds,
} = require('../../helpers/HttpClient');

class RelatedItemsWidget extends React.Component {
  constructor(props) {
    super(props);
    const { product } = this.props;
    this.state = {
      currentProduct: product,
      relatedProducts: [],
      productsToDisplay: [],
      index: 0,
    };

    this.cycleRight = this.cycleRight.bind(this);
    this.cycleLeft = this.cycleLeft.bind(this);
  }

  componentDidMount() {
    const { product } = this.props;

    getRelatedIds(product.id)
      .then((idList) => {
        const promises = idList.data.map((id) => getProduct(id).then((result) => result.data));
        Promise.all(promises).then((result) => this.setRelatedProducts(result));
      });
  }

  setRelatedProducts(relatedProducts) {
    this.setState({
      relatedProducts,
      productsToDisplay: relatedProducts.slice(0, 4),

    });
  }

  cycleRight() {
    let { index } = this.state;
    const { productsToDisplay, relatedProducts } = this.state;
    index += 1;

    this.setState({
      productsToDisplay: relatedProducts.slice(index, index + 4),
      index,
    });
  }

  cycleLeft() {
    let { index } = this.state;
    const { productsToDisplay, relatedProducts } = this.state;
    index -= 1;

    this.setState({
      productsToDisplay: relatedProducts.slice(index, index + 4),
      index,
    });
  }

  render() {
    const {
      relatedProducts, productsToDisplay, currentProduct, index,
    } = this.state;

    const displayRightArrow = !(relatedProducts.length - index === 4);
    const displayLeftArrow = (index > 0);
    // const displayLeftArrow = true;

    console.log(displayLeftArrow);
    return (
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
          />
        </div>
      </div>
    );
  }
}

export default RelatedItemsWidget;
