import React from 'react';
import ComparisonModal from './ComparisonModal';

const {
  getStyles,
} = require('../../helpers/HttpClient');

class ProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      thumbnail: null,
      origPrice: null,
      salePrice: null,
    };
  }

  componentDidMount() {
    const { relatedProduct } = this.props;
    const { thumbnail, origPrice, salePrice } = this.state;

    getStyles(relatedProduct.id).then((result) => {
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
    })
      .catch((error) => { console.log('Error getting style for Product Card: ', error); });
  }

  displayPrice() {
    let { origPrice, salePrice } = this.state;
    const { relatedProduct } = this.props;

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
        {relatedProduct.default_price}
      </span>
    );
  }

  render() {
    const { relatedProduct, currentProduct, fetchData } = this.props;
    const { thumbnail } = this.state;
    const thumbnailNoImage = 'https://acttochange.org/wp-content/plugins/ninja-forms/assets/img/no-image-available-icon-6.jpg';

    return (
      <li className="productCard">
        <ComparisonModal
          product={relatedProduct}
          currentProduct={currentProduct}
        />
        <img
          className="productCardThumbnail"
          alt="Thumbnail for product"
          src={thumbnail || thumbnailNoImage}
        />
        <p className="productCardCategory">
          {relatedProduct.category.toUpperCase()}
        </p>
        <p
          className="productCardName"
          onClick={() => fetchData(relatedProduct.id)}
        >
          <b>{relatedProduct.name}</b>
        </p>
        <span>
          {this.displayPrice()}
        </span>
        <p className="productCardStars">
          Star Rating
        </p>
      </li>
    );
  }
}

export default ProductCard;
