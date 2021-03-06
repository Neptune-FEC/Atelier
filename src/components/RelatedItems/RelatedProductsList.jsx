import React from 'react';
import ProductCard from './ProductCard';

class RelatedProductsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const {
      displayLeftArrow, relatedProducts, currentProduct, displayRightArrow,
      cycleRight, cycleLeft, fetchData,
    } = this.props;

    return (
      <div>
        <ul className="productCardList">
          <li className="comparisonScrollArrowLeft"
            onClick={() => cycleLeft()}>
            {
              displayLeftArrow
                ? <i className="fas fa-chevron-left" />
                : ''
            }
          </li>
          {
            relatedProducts.length
              ? relatedProducts.map((product) => (
                <ProductCard
                  relatedProduct={product}
                  key={product.id}
                  currentProduct={currentProduct}
                  fetchData={fetchData}
                  starRating={product.rating?.avgRating}
                  numReviews={product.rating?.totalCount}
                />
              ))
              : <div className="no-related-products">No Related Products</div>
          }
          <li
            className="comparisonScrollArrowRight"
            onClick={() => cycleRight()}>
            {
              displayRightArrow
                ? <i className="fas fa-chevron-right" />
                : ''
            }
          </li>

        </ul>
      </div>
    );
  }
}

export default RelatedProductsList;
