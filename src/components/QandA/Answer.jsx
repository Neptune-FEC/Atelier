/* eslint-disable react/prop-types */
import React from 'react';
import moment from 'moment';
import PhotoList from './PhotoList';

class Answer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  helpfulAnswerHandler = (event) => {
    
  }

  render() {
    const { answer } = this.props;
    console.log('answer: ', answer);

    return (
      <div className="answer">
        <h4>A:</h4>
        <div>{answer.body}</div>
        <br />
        <div>
          <span>
            by
            &nbsp;
            {answer.answerer_name}
            ,
            &nbsp;
            {moment(answer.date).format('MMMM D, YYYY')}
          </span>
          &nbsp;&nbsp;&nbsp;
          |
          &nbsp;&nbsp;&nbsp;
          <span>
            Helpful?&nbsp;&nbsp;
            <u onCick={this.helpfulAnswerHandler}>Yes</u>
            &nbsp;
            (
            {answer.helpfulness}
            )
          </span>
          &nbsp;&nbsp;&nbsp;
          |
          &nbsp;&nbsp;&nbsp;
          <span>
            <u>Report</u>
          </span>
        </div>
        <div />
        <PhotoList photoList={answer.photos} />
      </div>
    );
  }
}

export default Answer;
