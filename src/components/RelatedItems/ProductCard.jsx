import React from 'react';
import ComparisonModal from './ComparisonModal';

class ProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { product, currentProduct } = this.props;

    return (
      <div className="productCard">
        {/* {console.log(product)} */}
        <ComparisonModal
          product={product}
          currentProduct={currentProduct}
        />
        <p>{product.category}</p>
        <h3>{product.name}</h3>
        <span>{product.default_price}</span>
      </div>
    );
  }
}

export default ProductCard;
