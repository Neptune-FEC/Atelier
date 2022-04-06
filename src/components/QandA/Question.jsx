import React from 'react';
import QuestionHeader from './QuestionHeader';
import AnsList from './AnsList';

const { getAnswers } = require('../../helpers/HttpClient');

class Question extends React.Component {
  constructor(props) {
    super(props);

    // const { question } = this.props;
    // const ansList = Object.values(question.answers);

    this.state = {
      listOfAnswers: [],
      numAnsShowing: 2,
    };
    this.callbackRenderAnsList = this.callbackRenderAnsList.bind(this);
    this.updateAnsStateHelper = this.updateAnsStateHelper.bind(this);
  }

  componentDidMount() {
    this.updateAnsStateHelper();
  }

  callbackRenderAnsList() {
    this.updateAnsStateHelper();
  }

  updateAnsStateHelper() {
    const { question } = this.props;
    getAnswers(question.question_id)
      .then((response) => {
        const sortedAnsList = response.data.results;
        sortedAnsList.sort((a, b) => b.helpfulness - a.helpfulness);
        this.setState({
          listOfAnswers: sortedAnsList,
        });
      })
      .catch((err) => {
        console.warn('Error in retrieving answers.', err);
      });
  }

  // TODO: add More Answers button & update numAnsShowing state.
  // use modal window

  render() {
    const { listOfAnswers, numAnsShowing } = this.state;
    const { question, callbackRenderQsList } = this.props;
    // console.log('this.props, Q: ', this.props);

    return (
      <div className="question">
        <h4>Q:</h4>
        {/* eslint-disable-next-line camelcase */}
        <div>{question.question_body}</div>
        <QuestionHeader
          question={question}
          callbackRenderQsList={callbackRenderQsList}
        />
        <span>
          by
          &nbsp;
          {question.asker_name}
        </span>
        <br />
        <AnsList
          ansList={listOfAnswers}
          numAns={numAnsShowing}
          callbackRenderAnsList={this.callbackRenderAnsList}
        />
      </div>
    );
  }
}

export default Question;
