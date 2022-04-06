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

  handleSubmit(e) {
    const { skuId, selectedQuantity } = this.state;
    getStyles(66742).then((beforeStyles) => {
      getCart().then((response) => {
        postCart(skuId, selectedQuantity).then((postResponse) => {
          getCart().then((cartResponse) => {
            getStyles(66742).then((afterStyles) => {
            });
          });
        });
      });
    });
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
