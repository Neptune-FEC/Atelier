import React from 'react';
import ProductCard from './ProductCard';

class RelatedProductsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { relatedProducts, currentProduct } = this.props;

    return (
      <div>
        <h3>Product list</h3>
        <ul className="productCardList">
          {
            relatedProducts.length <= 4
              ? relatedProducts.map((product) => (
                <ProductCard
                  product={product}
                  key={product.id}
                  currentProduct={currentProduct}
                />
              ))
              : <div>loading</div>
          }
        </ul>
      </div>
    );
  }
}

export default RelatedProductsList;
