import React from 'react';
import ProductCard from './ProductCard';

class RelatedProductsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedProducts: [],
    };
  }

  componentDidMount() {
    const { relatedProducts } = this.props;

    this.setState({
      relatedProducts,
    });
    console.log('inside compo did mount of list ----', relatedProducts);
  }

  render() {
    const { relatedProducts } = this.state;
    return (
      <div className="relatedProductList">
        <h3>Product list</h3>
        {
          relatedProducts.map((prod, index) => (
            <div className="productCard">
              <ProductCard product={prod} index={index} />
            </div>
          ))
        }
        {console.log('inside render of list compo-----', relatedProducts)}
      </div>
    );
  }
}

export default RelatedProductsList;
