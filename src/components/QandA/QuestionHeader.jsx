import React from 'react';

const { voteQuestion } = require('../../helpers/HttpClient');

class QuestionHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpfulness: 0,
    };

    this.handleHelpfulQuestion = this.handleHelpfulQuestion.bind(this);
  }

  componentDidMount() {
    const { question } = this.props;
    this.setState({ helpfulness: question.question_helpfulness });
  }

  handleHelpfulQuestion(event) {
    event.preventDefault();
    const { question } = this.props;
    voteQuestion(question.question_id).then(() => {
      const { helpfulness } = this.state;
      const newHelpfulness = helpfulness + 1;
      this.setState({ helpfulness: newHelpfulness });
    })
      .catch((err) => {
        console.warn('Error in submitting vote.', err);
      });
  }

  render() {
    const { helpfulness } = this.state;
    // console.log('this.props: ', this.props);

    return (
      <div>
        <span>
          <span>
            Helpful?&nbsp;&nbsp;
            <u
              role="button"
              tabIndex={0}
              onClick={this.handleHelpfulQuestion}
              onKeyUp={this.handleHelpfulQuestion}
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
              Add Answer
            </u>
          </span>
        </span>
      </div>
    );
  }
}

export default QuestionHeader;