import React from 'react';
import SearchQ from './SearchQ';
import QList from './QList';
// import qListData from '../../data/serverData';

const { getQuestions } = require('../../helpers/HttpClient');

class QandA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // listOfQuestions: qListData.results,
      // numQsShowing: qListData.results.length,
      listOfQuestions: [],
      qSearch: '',
    };
    this.searchQuestionCallback = this.searchQuestionCallback.bind(this);
    this.updateQsStateHelper = this.updateQsStateHelper.bind(this);
  }

  componentDidMount() {
    this.updateQsStateHelper();
  }

  searchQuestionCallback(searchQuery) {
    this.setState({ qSearch: searchQuery });
  }

  updateQsStateHelper() {
    const { product } = this.props;
    getQuestions(product.id) // API call
      .then((response) => {
        const sortedQsList = response.data.results;
        sortedQsList.sort((a, b) => b.question_helpfulness - a.question_helpfulness);
        this.setState({
          listOfQuestions: sortedQsList,
        });
      })
      .catch((err) => {
        console.warn('Error in retrieving questions.', err);
      });
  }

  render() {
    const { listOfQuestions, qSearch } = this.state;
    const { product } = this.props;
    // console.log('product, QnA: ', product);

    return (
      <div>
        <h3>QUESTIONS & ANSWERS</h3>
        <br />
        <SearchQ
          searchQuestionCallback={this.searchQuestionCallback}
          qList={listOfQuestions}
        />
        <br />
        <div className="qsList">
          <QList
            qList={listOfQuestions}
            qSearch={qSearch}
            updateQsStateHelper={this.updateQsStateHelper}
            product={product}
          />
        </div>
      </div>
    );
  }
}

export default QandA;
