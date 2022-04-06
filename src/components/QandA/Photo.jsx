import React from 'react';

class Photo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { photo } = this.props;

    return (
      <img
        className="thumbnail"
        src={photo.url}
        alt="Customer submitted a discriptive visualization of the product"
      />
    );
  }
}

export default Photo;
