import React from 'react';

function ProductTitle(props) {
  const { product } = props;
  return (
    <div>
      <h3>{product.category}</h3>
      <h2>{product.name}</h2>
    </div>
  );
}

export default ProductTitle;
