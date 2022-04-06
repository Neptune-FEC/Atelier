import React from 'react';
import ProductCardYO from './ProductCardYO';

class YourOutfitList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        Your Outfit List
        <div>
          <ProductCardYO />
        </div>
      </div>
    );
  }
}

export default YourOutfitList;
