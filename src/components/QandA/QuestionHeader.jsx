import React from 'react';
import AddAns from './AddAns';

const { voteQuestion } = require('../../helpers/HttpClient');

class QuestionHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpfulness: 0,
      isQHelpful: false,
    };

    this.handleHelpfulQuestion = this.handleHelpfulQuestion.bind(this);
  }

  componentDidMount() {
    const { question } = this.props;
    this.setState({ helpfulness: question.question_helpfulness });
  }

  handleHelpfulQuestion() {
    const { question, updateQsStateHelper } = this.props;
    voteQuestion(question.question_id)
      .then(() => {
        const { helpfulness } = this.state;
        const newHelpfulness = helpfulness + 1;
        this.setState({
          helpfulness: newHelpfulness,
          isQHelpful: true,
        });
      })
      .then(() => updateQsStateHelper())
      .catch((err) => {
        console.warn('Error in submitting helpful question vote.', err);
      });
  }

  render() {
    const { helpfulness, isQHelpful } = this.state;
    // console.log('this.props, qHeader: ', this.props);
    const {
      // eslint-disable-next-line camelcase
      question: { question_id, question_body, answers },
      updateAnsStateHelper,
      product,
    } = this.props;
    // console.log('this.props.question, qHeader: ', this.props.question);

    return (
      <div>
        <span>
          <span>
            Helpful?&nbsp;&nbsp;
            {isQHelpful
              ? <u>Yes</u>
              : (
                <u
                  role="button"
                  tabIndex={0}
                  onClick={this.handleHelpfulQuestion}
                  onKeyUp={this.handleHelpfulQuestion}
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
            <AddAns
              // eslint-disable-next-line camelcase
              questionId={question_id}
              // eslint-disable-next-line camelcase
              questionBody={question_body}
              updateAnsStateHelper={updateAnsStateHelper}
              answers={answers}
              product={product}
            />
          </span>
        </span>
      </div>
    );
  }
}

export default QuestionHeader;
