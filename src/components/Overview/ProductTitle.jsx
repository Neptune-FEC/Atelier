import React from 'react';

function ProductTitle(props) {
  const { product, handleClick } = props;
  return (
    <div role="presentation" onClick={(e) => { handleClick(e, 'ProductTitle'); }}>
      <div className="overview-category">{product.category}</div>
      <div className="overview-name">{product.name}</div>
    </div>
  );
}

export default ProductTitle;
