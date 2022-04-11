import React from 'react';

class Photo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { photo } = this.props;
    const thumbnailNoImage = 'https://acttochange.org/wp-content/plugins/ninja-forms/assets/img/no-image-available-icon-6.jpg';
    return (
      <img
        className="thumbnail"
        src={photo.url || thumbnailNoImage}
        alt="Customer submitted a discriptive visualization of the product"
      />
    );
  }
}

export default Photo;
