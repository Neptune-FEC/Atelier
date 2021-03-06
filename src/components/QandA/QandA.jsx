import React from 'react';
import SearchQ from './SearchQ';
import QList from './QList';
// import qListData from '../../data/serverData';

const { getQuestions } = require('../../helpers/HttpClient');

class QandA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currProduct: null,
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

  componentDidUpdate(prevProps) {
    const { product } = this.props;
    if (prevProps.product.id !== product.id) {
      this.updateQsStateHelper();
    }
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
          currProduct: product,
          listOfQuestions: sortedQsList,
        });
      })
      .catch((err) => {
        console.warn('Error in retrieving questions.', err);
      });
  }

  render() {
    const { currProduct, listOfQuestions, qSearch } = this.state;
    const { handleClick } = this.props;
    // console.log('product, QnA: ', product);

    return (
      <div className="qna" onClick={(event) => handleClick(event, 'Q and A')}>
        <h3>QUESTIONS & ANSWERS</h3>
        <SearchQ
          searchQuestionCallback={this.searchQuestionCallback}
          qList={listOfQuestions}
        />
        <QList
          product={currProduct}
          qList={listOfQuestions}
          qSearch={qSearch}
          updateQsStateHelper={this.updateQsStateHelper}
        />
      </div>
    );
  }
}

export default QandA;
