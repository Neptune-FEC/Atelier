import React from 'react';
import SizeSelector from './SizeSelector';
import QuantitySelector from './QuantitySelector';
import { postCart, getCart, getStyles } from '../../helpers/HttpClient';

class AddToCart extends React.Component {
  constructor(props) {
    const { selectedStyle } = props;
    const { skus } = selectedStyle;
    super(props);
    this.state = {
      skus,
      skuId: '',
      selectedQuantity: '-',
    };
    this.handleSizeSelect = this.handleSizeSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleQuantitySelect = this.handleQuantitySelect.bind(this);
  }

  handleSizeSelect(skuId) {
    this.setState({
      skuId,
    });
  }

  handleQuantitySelect(selectedQuantity) {
    this.setState({
      selectedQuantity,
    });
  }

  handleSubmit(e) {
    const { skuId, selectedQuantity } = this.state;
    postCart(skuId, selectedQuantity);
    e.preventDefault();
  }

  render() {
    const { skus, skuId, selectedQuantity } = this.state;
    return (
      <>
        <div className="split">
          <SizeSelector
            skus={skus}
            handleSizeSelect={this.handleSizeSelect}
            handleQuantitySelect={this.handleQuantitySelect}
          />
          <QuantitySelector
            skuId={skuId}
            skus={skus}
            handleQuantitySelect={this.handleQuantitySelect}
            selectedQuantity={selectedQuantity}
          />
        </div>
        <div className="overview-add-to-cart">
          <div className="add-to-cart-container">
            <div role="presentation" onClick={() => { }} className="add-to-cart">Add To Cart</div>
            <i className="fa fa-plus add-icon" />
          </div>
          <div className="heart-icon"><i className="fa fa-heart-o heart-icon" /></div>
        </div>
      </>
    );
  }
}

export default AddToCart;
