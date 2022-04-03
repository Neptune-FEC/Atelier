import React from 'react';
// import PhotoList from './PhotoList';


class Photo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }



  render() {
    // var ans = this.props.answer
    // console.log('answer: ', ans)

    return (
      <img class="thumbnail" src={this.props.photo} />
    );
  }
}

export default Photo;

