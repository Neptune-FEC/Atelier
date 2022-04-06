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
      <li className="productCard">
        {/* {console.log(product)} */}
        <ComparisonModal
          product={product}
          currentProduct={currentProduct}
        />
        <span className="productCardThumbnail">Thumbnail IMG</span>
        <p className="productCardCategory">{product.category}</p>
        <p className="productCardName"><b>{product.name}</b></p>
        <span className="productCardDefaultPrice">
          $
          {product.default_price}
        </span>
      </li>
    );
  }
}

export default ProductCard;
