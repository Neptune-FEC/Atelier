import React from 'react';
import SizeSelector from './SizeSelector';
import QuantitySelector from './QuantitySelector';

class AddToCart extends React.Component {
  constructor(props) {
    const { selectedStyle } = props;
    const { skus } = selectedStyle;
    super(props);
    this.state = {
      skus,
      skuId: '',
      selectedQuantity: '',
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

  // handleSubmit(selectedSize, selectedQuantity) {
  //   console.log(selectedSize, selectedQuantity);
  // }

  handleSubmit(e) {
    const { skuId, selectedQuantity } = this.state;
    console.log(skuId, selectedQuantity);
    e.preventDefault();
  }

  render() {
    const { skus, skuId } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        Pick your Size and Quantity:
        <SizeSelector skus={skus} handleSizeSelect={this.handleSizeSelect} />
        <QuantitySelector
          skuId={skuId}
          skus={skus}
          handleQuantitySelect={this.handleQuantitySelect}
        />
        <input type="submit" value="Add to cart" />
      </form>
    );
  }
}

export default AddToCart;
