import React from 'react';

function ProductOverview(props) {
  const { product } = props;
  return <div>{product.description}</div>;
}

export default ProductOverview;
