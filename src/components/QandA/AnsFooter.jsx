import React from 'react';
import moment from 'moment';

const { voteAnswer, reportAnswer } = require('../../helpers/HttpClient');

class AnsFooter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpfulness: 0,
      isAnsReported: false,
      isAnsHelpful: false,
    };

    this.handleHelpfulAnswer = this.handleHelpfulAnswer.bind(this);
    this.toggleReportedAnswer = this.toggleReportedAnswer.bind(this);
  }

  componentDidMount() {
    const { answer } = this.props;
    this.setState({ helpfulness: answer.helpfulness });
  }

  handleHelpfulAnswer() {
    const { answer, callbackRenderAnsList } = this.props;
    // console.log('answer in footer, after click: ', answer);
    voteAnswer(answer.answer_id)
      .then(() => {
        const { helpfulness } = this.state;
        const newHelpfulness = helpfulness + 1;
        this.setState({
          helpfulness: newHelpfulness,
          isAnsHelpful: true,
        });
      })
      .then(() => callbackRenderAnsList()) // callsback to Question component
      .catch((err) => {
        console.warn('Error in retrieving answers.', err);
      });
  }

  toggleReportedAnswer() {
    const { answer } = this.props;
    reportAnswer(answer.answer_id).then(() => {
      this.setState((oldState) => ({
        isAnsReported: !oldState.isAnsReported,
      }));
    })
      .catch((err) => {
        console.warn('Error in retrieving answers.', err);
      });
  }

  render() {
    const { answer } = this.props;
    const { helpfulness, isAnsReported, isAnsHelpful } = this.state;
    // console.log('answer: ', answer);

    return (
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
          {isAnsHelpful
            ? <u>Yes</u>
            : (
              <u
                role="button"
                tabIndex={0}
                onClick={this.handleHelpfulAnswer}
                onKeyUp={this.handleHelpfulAnswer}
              >
                Yes
              </u>
            )}
          &nbsp;
          (
          {helpfulness}
          )
        </span>
        &nbsp;&nbsp;&nbsp;
        |
        &nbsp;&nbsp;&nbsp;
        <span>
          {isAnsReported
            ? <u>Reported</u>
            : (
              <u
                role="button"
                tabIndex={0}
                onClick={this.toggleReportedAnswer}
                onKeyUp={this.toggleReportedAnswer}
              >
                Report
              </u>
            )}

        </span>
      </div>
    );
  }
}

export default AnsFooter;
