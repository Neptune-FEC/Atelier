import React from 'react';
import RelatedProductsList from './RelatedProductsList';
import YourOutfitList from './YourOutfitList';

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
    this.updateRelatedList();
  }

  componentDidUpdate(prevProps, prevState) {
    this.updateRelatedList(prevState.currentProduct.id);
  }

  setRelatedProducts(relatedProducts) {
    const { product } = this.props;

    this.setState({
      currentProduct: product,
      relatedProducts,
      productsToDisplay: relatedProducts.slice(0, 4),
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
      relatedProducts, productsToDisplay, currentProduct, index,
    } = this.state;
    const { fetchData } = this.props;

    const displayRightArrow = !(relatedProducts.length - index === 4);
    const displayLeftArrow = (index > 0);

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
            fetchData={fetchData}
          />
        </div>
        <div>
          <YourOutfitList
            currentProduct={currentProduct}
          />
        </div>
      </div>
    );
  }
}

export default RelatedItemsWidget;
