import React from 'react';
import ImageGallery from './ImageGallery';
import AddToCart from './AddToCart';
import StyleSelector from './StyleSelector';
import ProductInformation from './ProductInformation';

const { getStyles } = require('../../helpers/HttpClient');

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      styles: {},
      selectedStyle: {},
    };
    this.fetchData = this.fetchData.bind(this);
    this.handleStyleSelect = this.handleStyleSelect.bind(this);
  }

  componentDidMount() {
    const { product } = this.props;
    this.fetchData(product.id);
  }

  handleStyleSelect(style) {
    this.setState({
      selectedStyle: style,
    });
  }

  fetchData(productId) {
    getStyles(productId).then((response) => {
      // console.log(response.data);
      this.setState({
        styles: response.data,
        selectedStyle: response.data.results[0],
      });
    });
  }

  render() {
    const { product, starRating, numReviews } = this.props;
    const { styles, selectedStyle } = this.state;

    return Object.keys(styles).length && Object.keys(selectedStyle).length ? (
      <div>
        <ProductInformation
          product={product}
          selectedStyle={selectedStyle}
          starRating={starRating}
          numReviews={numReviews}
        />
        <ImageGallery selectedStyle={selectedStyle} />
        <StyleSelector styles={styles} handleStyleSelect={this.handleStyleSelect} />
        <AddToCart selectedStyle={selectedStyle} />
      </div>
    ) : (
      <div>loading</div>
    );
  }
}

export default Overview;
