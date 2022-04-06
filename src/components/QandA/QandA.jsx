import React from 'react';
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
      numQsShowing: 10,
    };
    this.updateQsStateHelper = this.updateQsStateHelper.bind(this);
  }

  componentDidMount() {
    this.updateQsStateHelper();
  }

  updateQsStateHelper() {
    const { product } = this.props;
    getQuestions(product.id)
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

  // numofQsToRender = (props) => {
  //   this.setState({
  //     listOfQuestions: qListData.results.slice(0, 2)
  //   })
  // }

  render() {
    const { listOfQuestions, numQsShowing } = this.state;
    // console.log('listOfQuestions: ', listOfQuestions);
    const { product } = this.props;
    // console.log('product, QnA: ', product);

    return (
      <div>
        <h3>QUESTIONS & ANSWERS</h3>
        <br />
        {/* <SearchQuestion />
        <br /> */}
        <QList
          qList={listOfQuestions}
          numQs={numQsShowing}
          updateQsStateHelper={this.updateQsStateHelper}
          product={product}
        />
      </div>
    );
  }
}

export default QandA;
