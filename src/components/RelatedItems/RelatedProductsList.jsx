import React from 'react';
import ProductCard from './ProductCard';

class RelatedProductsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        Product list
        <div>
          <ProductCard />
        </div>
      </div>
    );
  }
}

export default RelatedProductsList;
