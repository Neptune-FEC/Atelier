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
      <div className="relatedProductList">
        <h3>Product list</h3>
        {
          relatedProducts.length
            ? relatedProducts.map((product) => (
              <ProductCard
                product={product}
                key={product.id}
                currentProduct={currentProduct}
              />
            ))
            : <div>loading</div>
        }
      </div>
    );
  }
}

export default RelatedProductsList;
