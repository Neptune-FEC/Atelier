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

    getRelatedIds(product.id)
      .then((idList) => {
        const promises = idList.data.map((id) => getProduct(id).then((result) => result.data));
        Promise.all(promises).then((result) => this.setRelatedProducts(result));
      });
  }

  setRelatedProducts(relatedProducts) {
    this.setState({
      relatedProducts,
    });
  }

  render() {
    const { relatedProducts, currentProduct } = this.state;
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

// .then((relatedProd) => {
//   // prods.push(relatedProd.data);

//   prods.push(1);
//   this.setRelatedProducts(prods);
// })
// .catch((err) => { console.log('ERROR getProduct~~~~~~~~~', err); });
// .catch((err) => { console.log('ERROR getRelatedIds--------', err); })
// .then((result) => {
//   // console.log(relatedProducts.length);
//   console.log('END OF PROMISE CHAIN', result);
//   this.setRelatedProducts(prods);
// });
