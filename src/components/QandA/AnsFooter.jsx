import React from 'react';
import moment from 'moment';
import PhotoList from './PhotoList';

const { voteAnswer } = require('../../helpers/HttpClient');

class AnsFooter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpfulness: 0,
      isAnsReported: false,
      isAnsHelpful: false,
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
      this.setState({
        helpfulness: newHelpfulness,
        isAnsHelpful: true,
      });
    })
      .catch((err) => {
        console.warn('Error in retrieving questions.', err);
      });
  }

  toggleReported(event) {
    event.preventDefault();
    // TODO: make API call to report answer and store persistent data in db
    this.setState((oldState) => ({
      isAnsReported: !oldState.isAnsReported,
    }));
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
                onClick={this.toggleReported}
                onKeyUp={this.toggleReported}
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
