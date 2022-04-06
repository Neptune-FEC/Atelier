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
      numQsShowing: 2,
    };
    this.callbackRenderQsList = this.callbackRenderQsList.bind(this);
    this.updateQsStateHelper = this.updateQsStateHelper.bind(this);
  }

  componentDidMount() {
    this.updateQsStateHelper();
  }

  callbackRenderQsList() {
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
    // console.log('product: ', this.props.product.id);

    return (
      <div>
        <h3>QUESTIONS & ANSWERS</h3>
        <br />
        {/* <SearchQuestion />
        <br /> */}
        <QList
          qList={listOfQuestions}
          numQs={numQsShowing}
          callbackRenderQsList={this.callbackRenderQsList}
        />
      </div>
    );
  }
}

export default QandA;
