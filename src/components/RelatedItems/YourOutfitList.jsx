import React from 'react';
import ProductCardYO from './ProductCardYO';

class YourOutfitList extends React.Component {
  constructor(props) {
    super(props);
    const { currentProduct } = this.props;
    this.state = {
      outfit: [],
      currentProduct,
    };

    this.addToOutfit = this.addToOutfit.bind(this);
    this.removeFromOutfit = this.removeFromOutfit.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentProduct } = this.props;
    if (prevProps.currentProduct.id !== currentProduct.id) {
      this.setState({
        currentProduct,
      });
    }
  }

  addToOutfit() {
    const { outfit, currentProduct } = this.state;

    outfit.unshift(currentProduct);

    this.setState({
      outfit,
    });
  }

  removeFromOutfit(index) {
    const { outfit } = this.state;

    console.log(outfit.splice(index, 1));

    this.setState({
      outfit,
    });
  }

  render() {
    const { outfit, currentProduct } = this.state;

    return (
      <div>
        <h3>Your Outfit</h3>
        <ul className="your-outfit-card-list">
          {
            !(outfit.includes(currentProduct))
              ? <button
                className="your-outfit-add-button"
                type="button"
                onClick={() => this.addToOutfit()}
              >
                +
              </button>
              : ''

          }
          {
            outfit.length
              ? outfit.map((product, i) => (
                <ProductCardYO
                  product={product}
                  key={product.id}
                  index={i}
                  removeFromOutfit={this.removeFromOutfit}
                />
              ))
              : ''
          }
        </ul>
      </div>
    );
  }
}

export default YourOutfitList;
