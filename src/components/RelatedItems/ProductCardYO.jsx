import React from 'react';
import StarRatingProdCard from './StarRatingProdCard';

const {
  getStyles,
} = require('../../helpers/HttpClient');

class ProductCardYO extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      thumbnail: null,
      origPrice: null,
      salePrice: null,
    };
  }

  componentDidMount() {
    const { product } = this.props;
    const { thumbnail, origPrice, salePrice } = this.state;

    getStyles(product.id).then((result) => {
      result.data.results.forEach((style) => {
        if (style['default?']) {
          this.setState({
            thumbnail: style.photos[0].thumbnail_url,
          });
          if (style.sale_price) {
            this.setState({
              salePrice: style.sale_price,
              origPrice: style.original_price,
            });
          }
        }
      });
      if (!thumbnail) {
        this.setState({
          thumbnail: result.data.results[0].photos[0].thumbnail_url,
        });
      }
      if (product.id === 66643) {
        this.setState({
          thumbnail: 'https://i.kym-cdn.com/entries/icons/original/000/028/926/cove3.jpg',
        });
      }
    })
      .catch((error) => { console.log('Error getting style for Product Card: ', error); });
  }

  displayPrice() {
    let { origPrice, salePrice } = this.state;
    const { product } = this.props;

    /*
      To simulate sale prices on the product cards, uncomment the if statement below
      I could not find any products which had sale prices
    */

    // if (!salePrice) {
    //   origPrice = 100;
    //   salePrice = 25;
    // }

    if (salePrice) {
      return (
        <span
          className="productCardDefaultPrice"
        >
          <span
            className="productCardOrigPriceStrikethru"
          >
            $
            {origPrice}
          </span>
          <span className="productCardSalePrice">
            $
            {salePrice}
          </span>
        </span>
      );
    }
    return (
      <span
        className="productCardDefaultPrice"
      >
        $
        {product.default_price}
      </span>
    );
  }

  render() {
    const {
      product, removeFromOutfit, index,
      starRating, numReviews,
    } = this.props;
    const { thumbnail } = this.state;
    const thumbnailNoImage = 'https://acttochange.org/wp-content/plugins/ninja-forms/assets/img/no-image-available-icon-6.jpg';

    return (
      <li className="productCard">
        {/* <button
          className="your-outfit-product-card-remove"
          onClick={() => removeFromOutfit(index)}
        >
          X
        </button> */}
        <i
          className="your-outfit-product-card-remove fa-regular fa-circle-xmark"
          onClick={() => removeFromOutfit(index)}
        ></i>
        <img
          className="productCardThumbnail"
          alt="Thumbnail for product"
          src={thumbnail || thumbnailNoImage}
        />
        <p className="productCardCategory">
          {product.category.toUpperCase()}
        </p>
        <p
          className="productCardName"
        >
          <b>{product.name}</b>
        </p>
        <span>
          {this.displayPrice()}
        </span>
        <div className="productCardStars">
          <StarRatingProdCard
            starRating={starRating}
            numReviews={numReviews}
          />
        </div>
      </li>
    );
  }
}

export default ProductCardYO;
