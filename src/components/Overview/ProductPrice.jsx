/* eslint-disable camelcase */
import React from 'react';

function ProductPrice(props) {
  const { selectedStyle, handleClick } = props;
  const { original_price, sale_price } = selectedStyle;
  return (
    <div className="overview-price" role="presentation" onClick={(e) => { handleClick(e, 'ProductTitle'); }}>
      {!sale_price
        && (
          <span className="price-current">
            $
            {Math.floor(original_price)}
          </span>
        )}

      {sale_price
        && (
          <>
            <span className="price-old">
              $
              {Math.floor(original_price)}
            </span>
            <span className="price-current" style={{ color: 'red' }}>
              $
              {Math.floor(sale_price)}
            </span>
          </>
        )}
    </div>
  );
}

export default ProductPrice;
