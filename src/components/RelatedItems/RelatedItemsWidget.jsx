import React from 'react';
import RelatedProductsList from './RelatedProductsList';

const {
  getProduct, getRelatedIds,
} = require('../../helpers/HttpClient');

class RelatedItemsWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
          relatedProducts,
        });
      });
  }

  render() {
    const { relatedProducts } = this.state;
    return (
      <div>
        Related Items & Comparison
        <div>
          <RelatedProductsList
            relatedProducts={relatedProducts}
          />
        </div>
      </div>
    );
  }
}

export default RelatedItemsWidget;
