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
    };
  }

  componentDidMount() {
    const { product } = this.props;
    const relatedProducts = [];

    getRelatedIds(product.id)
      .then((idList) => {
        idList.data.forEach((id) => {
          getProduct(id)
            .then((relatedProd) => {
              relatedProducts.push(relatedProd.data);
            })
            .catch((err) => { console.log('ERROR getProduct~~~~~~~~~', err); });
        });
      })
      .catch((err) => { console.log('ERROR getRelatedIds--------', err); })
      .then(() => {
        this.setState({
          currentProduct: product,
          relatedProducts,
        });
        // console.log('inside .then ----', relatedProducts);
      });
  }

  render() {
    const { relatedProducts, currentProduct } = this.state;
    // console.log('inside render', relatedProducts);
    return (
      <div>
        <h2>Related Items & Comparison</h2>
        <div>
          <RelatedProductsList
            currentProduct={currentProduct}
            relatedProducts={relatedProducts}
          />
        </div>
      </div>
    );
  }
}

export default RelatedItemsWidget;
