import React from 'react';

function ProductTitle(props) {
  const { product } = props;
  return (
    <div className="overview-title">
      <div className="overview-category">{product.category}</div>
      <div className="overview-name">{product.name}</div>
    </div>
  );
}

export default ProductTitle;
