import React from 'react';
import SizeSelector from './SizeSelector';
import QuantitySelector from './QuantitySelector';
import { getCart, postCart } from '../../helpers/HttpClient';

class AddToCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSizeDropdown: false,
      message: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.setMessage = this.setMessage.bind(this);
  }

  handleSubmit(id, selectedQuantity, selectedSize) {
    const {
      skuId, handleQuantitySelect, handleSizeSelect,
    } = this.props;
    if (skuId) {
      handleQuantitySelect('-');
      handleSizeSelect(null);
    } else {
      this.setState({ message: 'Please select size' });
      this.toggleDropdown();
    }
  }

  setMessage() {
    this.setState({
      message: null,
    });
  }

  toggleDropdown() {
    const { isSizeDropdown } = this.state;
    this.setState({
      isSizeDropdown: !isSizeDropdown,
    });
  }

  render() {
    const {
      skuId, selectedQuantity, selectedStyle,
      selectedSize, handleSizeSelect, handleQuantitySelect,
    } = this.props;
    const { isSizeDropdown, message } = this.state;
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
          <div className="split">
            <SizeSelector
              selectedStyle={selectedStyle}
              selectedSize={selectedSize}
              skus={skus}
              handleSizeSelect={handleSizeSelect}
              handleQuantitySelect={handleQuantitySelect}
              isSizeDropdown={isSizeDropdown}
              toggleDropdown={this.toggleDropdown}
              setMessage={this.setMessage}
            />
            <QuantitySelector
              skuId={skuId}
              skus={skus}
              handleQuantitySelect={handleQuantitySelect}
              selectedQuantity={selectedQuantity}
            />
          </div>
          <div className="overview-add-to-cart" role="presentation" onClick={() => { this.handleSubmit(skuId, selectedQuantity, selectedSize); }}>
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
}

export default AddToCart;
