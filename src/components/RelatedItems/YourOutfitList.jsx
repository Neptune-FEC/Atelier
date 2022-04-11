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

  componentDidUpdate(prevProps) {
    const { currentProduct } = this.props;
    if (prevProps.currentProduct.id !== currentProduct.id) {
      this.setState({
        currentProduct,
      });
    }
  }

  addToOutfit() {
    const { outfit, currentProduct } = this.state;
    const { starRating, numReviews } = this.props;

    currentProduct.starRating = starRating;
    currentProduct.numReviews = numReviews;

    outfit.unshift(currentProduct);

    this.setState({
      outfit,
    });
  }

  removeFromOutfit(index) {
    const { outfit } = this.state;

    outfit.splice(index, 1);

    this.setState({
      outfit,
    });
  }

  render() {
    const { outfit, currentProduct } = this.state;

    return (
      <div>
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
                  starRating={product.starRating}
                  numReviews={product.numReviews}
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
