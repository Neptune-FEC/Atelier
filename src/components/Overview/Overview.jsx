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
    product, starRating, numReviews, styles,
    selectedStyle, handleStyleSelect, selectedSize,
    skuId, selectedQuantity, handleSizeSelect, handleQuantitySelect, isExpand, handleExpand,
  } = props;

  return styles && selectedStyle ? (
    <>
      <section>
        <div className="container">
          <div className="overview-upper-part">
            <div className="left-container">
              <ImageGallery
                selectedStyle={selectedStyle}
                isExpand={isExpand}
                handleExpand={handleExpand}
              />
            </div>
            <div className="right-container">
              <StarRating starRating={starRating} numReviews={numReviews} />
              <ProductTitle product={product} />
              <ProductPrice selectedStyle={selectedStyle} />
              <StyleSelector
                styles={styles}
                selectedStyle={selectedStyle}
                handleStyleSelect={handleStyleSelect}
                handleSizeSelect={handleSizeSelect}
                handleQuantitySelect={handleQuantitySelect}
              />
              <AddToCart
                selectedStyle={selectedStyle}
                selectedSize={selectedSize}
                skuId={skuId}
                selectedQuantity={selectedQuantity}
                handleSizeSelect={handleSizeSelect}
                handleQuantitySelect={handleQuantitySelect}
              />
              <ShareOnSocialMedia product={product} />
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
