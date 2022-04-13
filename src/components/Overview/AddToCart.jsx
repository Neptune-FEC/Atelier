import React from 'react';
import { postCart } from '../../helpers/HttpClient';

function AddToCart(props) {
  const {
    selectedStyle, children, isSizeDropdown,
    message, handleSubmit, skuId, selectedQuantity, selectedSize, handleClick,
  } = props;
  const { skus } = selectedStyle;
  const allSkuIds = Object.keys(skus);
  let inventory = 0;
  for (let i = 0; i < allSkuIds.length; i += 1) {
    const id = allSkuIds[i];
    const sku = skus[id];
    inventory += sku.quantity;
  }
  return (inventory
    && (
      <>
        {(isSizeDropdown && message) && <div> Please select size</div>}
        <div
          className="split"
          role="presentation"
          onClick={(e) => { handleClick(e, 'AddToCart'); }}
        >
          {children}
        </div>
        <div className="overview-add-to-cart" role="presentation" onClick={(e) => { handleSubmit(skuId, selectedQuantity, selectedSize); handleClick(e, 'ImageGallery'); }}>
          <div className="add-to-cart-container">
            <div className="add-to-cart">Add To Cart</div>
            <i className="fa fa-plus add-icon" />
          </div>
          <div className="heart-icon"><i className="fa fa-heart-o" /></div>
        </div>
      </>
    )
  );
}

export default AddToCart;
