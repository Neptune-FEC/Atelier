import React from 'react';

function ProductPrice(props) {
  const { selectedStyle } = props;
  // eslint-disable-next-line camelcase
  const { original_price, sale_price } = selectedStyle;
  return (
    // eslint-disable-next-line camelcase
    (sale_price && <div>{sale_price}</div>) || <div>{original_price}</div>
  );
}

export default ProductPrice;
