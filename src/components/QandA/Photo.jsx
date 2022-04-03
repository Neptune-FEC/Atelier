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
      <div>
        <img src={this.props.photo}/>
      </div>
    );
  }
}

export default Photo;

