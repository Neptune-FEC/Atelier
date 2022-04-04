import React from 'react';
// import PhotoList from './PhotoList';

class Photo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { photo } = this.props;

    return (
      <img className="thumbnail" src={photo} alt="Customer submitted a discriptive visualization of the product" />
    );
  }
}

export default Photo;
