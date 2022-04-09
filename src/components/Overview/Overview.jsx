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
    <>
      <section>
        <div className="container">
          <div className="overview-upper-part">
            <div className="left-container">
              <ImageGallery selectedStyle={selectedStyle} />
            </div>
            <div className="right-container">
              <StarRating starRating={starRating} numReviews={numReviews} />
              <ProductTitle product={product} />
              <ProductPrice selectedStyle={selectedStyle} />
              <StyleSelector
                styles={styles}
                selectedStyle={selectedStyle}
                handleStyleSelect={handleStyleSelect}
              />
              <AddToCart selectedStyle={selectedStyle} />
              <ShareOnSocialMedia />
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="overview-lower-part">
            <ProductOverview product={product} />
          </div>
        </div>
      </section>
    </>
  ) : (
    <div>loading</div>
  );
}

export default Overview;
