import React from 'react';
import StarRating from './StarRating';
import ProductOverview from './ProductOverview';
import ProductTitle from './ProductTitle';
import ProductPrice from './ProductPrice';
import ShareOnSocialMedia from './ShareOnSocialMedia';

function ProductInformation(props) {
  const {
    product, starRating, numReviews, selectedStyle,
  } = props;
  return (
    <div>
      <StarRating starRating={starRating} numReviews={numReviews} />
      <ProductTitle product={product} />
      <ProductOverview product={product} />
      <ProductPrice selectedStyle={selectedStyle} />
      <ShareOnSocialMedia />
    </div>
  );
}

export default ProductInformation;
