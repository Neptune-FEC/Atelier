import React from 'react';
import ImageGallery from './ImageGallery';
import AddToCart from './AddToCart';
import StyleSelector from './StyleSelector';
import StarRating from './StarRating';
import ProductOverview from './ProductOverview';
import ProductTitle from './ProductTitle';
import ProductPrice from './ProductPrice';
import ShareOnSocialMedia from './ShareOnSocialMedia';
// import ProductInformation from './ProductInformation';

function Overview(props) {
  const {
    product, starRating, numReviews, styles, selectedStyle, handleStyleSelect,
  } = props;

  return Object.keys(styles).length && Object.keys(selectedStyle).length ? (
    <div className="overview">
      <div className="overview-upper-part">

        <ImageGallery selectedStyle={selectedStyle} />

        <div className="overview-upper-part-right">

          <StarRating starRating={starRating} numReviews={numReviews} />
          <ProductTitle product={product} />
          <ProductPrice selectedStyle={selectedStyle} />
          <StyleSelector styles={styles} handleStyleSelect={handleStyleSelect} />
          <AddToCart selectedStyle={selectedStyle} />

        </div>
      </div>
      <div className="overview-lower-part">
        <ProductOverview product={product} />
        <ShareOnSocialMedia />
      </div>
    </div>
  ) : (
    <div>loading</div>
  );
}

export default Overview;
