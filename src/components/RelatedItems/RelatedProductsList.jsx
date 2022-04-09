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
        <h3>Product list</h3>
        <ul className="productCardList">
          <li className="comparisonScrollArrowLeft"
            onClick={() => cycleLeft()}>
            {
              displayLeftArrow
                ? '⇦'
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
                />
              ))
              : <div>loading</div>
          }
          <li
            className="comparisonScrollArrowRight"
            onClick={() => cycleRight()}>
            {
              displayRightArrow
                ? '⇨'
                : ''
            }
          </li>

        </ul>
      </div >
    );
  }
}

export default RelatedProductsList;
