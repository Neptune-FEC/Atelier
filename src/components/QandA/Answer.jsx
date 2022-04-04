/* eslint-disable react/prop-types */
import React from 'react';
import moment from 'moment';
import PhotoList from './PhotoList';

const { voteAnswer } = require('../../helpers/HttpClient');

class Answer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpfulness: 0,
      isReported: false,
    };

    this.handleHelpfulAnswer = this.handleHelpfulAnswer.bind(this);
    this.toggleReported = this.toggleReported.bind(this);
  }

  componentDidMount() {
    const { answer } = this.props;
    this.setState({ helpfulness: answer.helpfulness });
  }

  handleHelpfulAnswer(event) {
    event.preventDefault();
    const { answer } = this.props;
    voteAnswer(answer.id).then(() => {
      // console.log('response: ', response);
      const { helpfulness } = this.state;
      const newHelpfulness = helpfulness + 1;
      this.setState({ helpfulness: newHelpfulness });
    })
      .catch((err) => {
        console.warn('Error in retrieving questions.', err);
      });
  }

  toggleReported(event) {
    event.preventDefault();
    this.setState((oldState) => ({
      isReported: !oldState.isReported,
    }));
  }

  render() {
    const { answer } = this.props;
    const { helpfulness, isReported } = this.state;
    // console.log('answer: ', answer);

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
            <u
              role="button"
              tabIndex={0}
              onClick={this.handleHelpfulAnswer}
              onKeyUp={this.handleHelpfulAnswer}
            >
              Yes
            </u>
            &nbsp;
            (
            {helpfulness}
            )
          </span>
          &nbsp;&nbsp;&nbsp;
          |
          &nbsp;&nbsp;&nbsp;
          <span>
            <u
              role="button"
              tabIndex={0}
              onClick={this.toggleReported}
              onKeyUp={this.toggleReported}
            >
              {isReported ? 'Reported' : 'Report'}
            </u>
          </span>
        </div>
        <div />
        <PhotoList photoList={answer.photos} />
      </div>
    );
  }
}

export default Answer;
