import React from 'react';
import AnsList from './AnsList';


class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listofAnswers: this.props.question.answers,
      numAnsShowing: 2
    };
  }



  render() {
    var ansList = Object.values(this.props.question.answers)
    // console.log('array of answers in a Q: ', ansList)

    return (
      <div class="question">
        <h4>Q:</h4>
        <p>{this.props.question.question_body}</p>
        <AnsList
          ansList={ansList}
          numAns={this.state.numAnsShowing}
        />
      </div>
    );
  }
}

export default Question;

