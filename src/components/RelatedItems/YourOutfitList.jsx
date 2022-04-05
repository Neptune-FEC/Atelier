import React from 'react';
import ProductCard from './ProductCard';

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
          <ProductCard />
        </div>
      </div>
    );
  }
}

export default YourOutfitList;
