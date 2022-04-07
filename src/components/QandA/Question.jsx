import React from 'react';
import QuestionHeader from './QuestionHeader';
import AnsList from './AnsList';

const { getAnswers } = require('../../helpers/HttpClient');
const { sortAnsHelper } = require('../../helpers/ProductHelper');

class Question extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listOfAnswers: [],
      numAnsShowing: 2,
      // showAnsModal: false,
    };

    this.updateAnsStateHelper = this.updateAnsStateHelper.bind(this);
    // this.toggleAnsModal = this.toggleAnsModal.bind(this);
  }

  componentDidMount() {
    this.updateAnsStateHelper();
  }

  updateAnsStateHelper() { // is also a callback for AnsFooter component
    const { question } = this.props;
    getAnswers(question.question_id)
      .then((response) => {
        const sortedAnsList = sortAnsHelper(response.data.results);
        this.setState({
          listOfAnswers: sortedAnsList,
        });
        // console.log('sortedAnsList, Q: ', sortedAnsList);
      })
      .catch((err) => {
        console.warn('Error in retrieving answers.', err);
      });
  }

  // TODO: add More Answers button & update numAnsShowing state.
  // use modal window
  // toggleAnsModal() {
  //   const { showAnsModal } = this.state;
  //   this.setState({ showAnsModal: !showAnsModal });
  // }

  render() {
    const { listOfAnswers, numAnsShowing } = this.state;
    const { question, updateQsStateHelper, product } = this.props;
    // console.log('this.props, Q: ', this.props);

    return (
      <div className="question">
        <h4>Q:</h4>
        {/* eslint-disable-next-line camelcase */}
        <div>{question.question_body}</div>
        <QuestionHeader
          question={question}
          updateQsStateHelper={updateQsStateHelper}
          product={product}
          // toggleAnsModal={toggleAnsModal}
        />
        <span>
          by
          &nbsp;
          {question.asker_name}
        </span>
        <br />
        <h4>A:</h4>
        <AnsList
          ansList={listOfAnswers}
          numAns={numAnsShowing}
          updateAnsStateHelper={this.updateAnsStateHelper}
        />
      </div>
    );
  }
}

export default Question;
