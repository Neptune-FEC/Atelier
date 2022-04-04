import React from 'react';

function ProductTitle(props) {
  const { product } = props;
  return (
    <div>
      <div>{product.name}</div>
      <div>{product.category}</div>
    </div>
  );
}

export default ProductTitle;
