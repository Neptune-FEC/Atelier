import React from 'react';
import PhotoList from './PhotoList';


class Answer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }



  render() {
    var ans = this.props.answer
    // console.log('answer: ', ans)

    return (
      <div class="answer">
        <h4>A:</h4>
        <p>{ans.body}</p>
        <PhotoList photoList={ans.photos} />
      </div>
    );
  }
}

export default Answer;

