import React from 'react';
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
    const { question: { answers, question_body } } = this.props;
    const ansList = Object.values(answers);

    return (
      <div className="question">
        <h4>Q:</h4>
        <p>{question_body}</p>
        <AnsList
          ansList={ansList}
          numAns={numAnsShowing}
        />
      </div>
    );
  }
}

export default Question;
