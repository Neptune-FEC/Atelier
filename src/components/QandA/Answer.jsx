/* eslint-disable react/prop-types */
import React from 'react';
import AnsFooter from './AnsFooter';
import PhotoList from './PhotoList';

class Answer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { answer } = this.props;
    // console.log('answer: ', answer);

    return (
      <div className="answer">
        <h4>A:</h4>
        <div>{answer.body}</div>
        <br />
        <AnsFooter answer={answer} />
        <div />
        <PhotoList photoList={answer.photos} />
      </div>
    );
  }
}

export default Answer;
