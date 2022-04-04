import React from 'react';
import PhotoList from './PhotoList';

class Answer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { answer } = this.props;

    return (
      <div className="answer">
        <h4>A:</h4>
        <p>{answer.body}</p>
        <PhotoList photoList={answer.photos} />
      </div>
    );
  }
}

export default Answer;
