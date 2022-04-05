/* eslint-disable react/prop-types */
import React from 'react';
import QList from './QList';
// import qListData from '../../data/serverData';

const { getQuestions } = require('../../helpers/HttpClient');

class QandA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // product_id: qListData.product_id, // may not need this state...
      // listOfQuestions: qListData.results,
      // numQsShowing: qListData.results.length,
      listOfQuestions: [],
      numQsShowing: 2,
    };
  }

  // numofQsToRender = (props) => {
  //   this.setState({
  //     listOfQuestions: qListData.results.slice(0, 2)
  //   })
  // }

  componentDidMount() {
    const { product } = this.props;
    getQuestions(product.id).then((response) => {
      // console.log('response: ', response);
      this.setState({
        listOfQuestions: response.data.results,
      });
    })
      .catch((err) => {
        console.warn('Error in retrieving questions.', err);
      });
  }

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
        />
      </div>
    );
  }
}

export default QandA;
