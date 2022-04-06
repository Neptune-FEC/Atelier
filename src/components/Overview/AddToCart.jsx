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

  // handleSubmit(selectedSize, selectedQuantity) {
  //   console.log(selectedSize, selectedQuantity);
  // }

  handleSubmit(e) {
    const { skuId, selectedQuantity } = this.state;
    console.log('skuId', skuId);
    getStyles(66742).then((beforeStyles) => {
      console.log('styles before post', beforeStyles.data.results[0].skus);
      getCart().then((response) => {
        console.log('getcart', response.data);
        postCart(skuId, selectedQuantity).then((postResponse) => {
          console.log('postcart', postResponse.data);
          getCart().then((cartResponse) => {
            console.log('getcart after post', cartResponse.data);
            getStyles(66742).then((afterStyles) => {
              console.log('styles after post', afterStyles.data.results[0].skus);
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
