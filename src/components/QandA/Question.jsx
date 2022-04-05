import React from 'react';
import QuestionHeader from './QuestionHeader';
import AnsList from './AnsList';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // listofAnswers: this.props.question.answers,
      numAnsShowing: 2,
    };
  }

  render() {
    const { numAnsShowing } = this.state;
    // eslint-disable-next-line camelcase
    const { question } = this.props;
    const ansList = Object.values(question.answers);

    return (
      <div className="question">
        <h4>Q:</h4>
        {/* eslint-disable-next-line camelcase */}
        <p>{question.question_body}</p>
        <QuestionHeader question={question} />
        <AnsList
          ansList={ansList}
          numAns={numAnsShowing}
        />
      </div>
    );
  }
}

export default Question;
