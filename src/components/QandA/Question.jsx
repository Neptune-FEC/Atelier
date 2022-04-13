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
      showingMoreAnswers: false,
    };

    this.updateAnsStateHelper = this.updateAnsStateHelper.bind(this);
    this.handleShowMoreAns = this.handleShowMoreAns.bind(this);
  }

  componentDidMount() {
    this.updateAnsStateHelper();
  }

  handleShowMoreAns() {
    const { showingMoreAnswers } = this.state;
    this.setState({
      showingMoreAnswers: !showingMoreAnswers,
    });
  }

  updateAnsStateHelper() { // is also a callback for AnsFooter component
    const { question } = this.props;
    getAnswers(question.question_id)
      .then((response) => {
        const sortedAnsList = sortAnsHelper(response.data.results);
        this.setState({
          listOfAnswers: sortedAnsList,
        });
      })
      .catch((err) => {
        console.warn('Error in retrieving answers.', err);
      });
  }

  render() {
    const { listOfAnswers, numAnsShowing, showingMoreAnswers } = this.state;
    const { question, updateQsStateHelper, product } = this.props;
    // console.log('this.props, Q: ', this.props);

    let buttonText = '';
    if (listOfAnswers.length > 2 && !showingMoreAnswers) {
      buttonText = 'See More Answers';
    } else if (showingMoreAnswers) {
      buttonText = 'Collapse Answers';
    }

    return (
      <div className="question">
        <div className="qTopRow">
          <p className="qSectionStart"><b>Q:</b></p>
          <div className="qBody">
            {/* eslint-disable-next-line camelcase */}
            <div>{question.question_body}</div>
            <div className="qAsker">
              by
              &nbsp;
              {question.asker_name}
            </div>
          </div>
          <QuestionHeader
            question={question}
            updateQsStateHelper={updateQsStateHelper}
            updateAnsStateHelper={this.updateAnsStateHelper}
            product={product}
          />
        </div>

        <div className="answers">
          <p className="ansSectionStart"><b>A:</b></p>
          <AnsList
            ansList={listOfAnswers}
            numAns={numAnsShowing}
            updateAnsStateHelper={this.updateAnsStateHelper}
            showingMoreAnswers={showingMoreAnswers}
          />
        </div>
        <div>
          {
            listOfAnswers.length < 2
              ? null
              : (
                <div>
                  <b
                    className="moreAns"
                    role="button"
                    tabIndex={0}
                    onClick={this.handleShowMoreAns}
                    onKeyUp={this.handleShowMoreAns}
                  >
                    {buttonText}
                  </b>
                </div>
              )
          }
        </div>
      </div>
    );
  }
}

export default Question;
