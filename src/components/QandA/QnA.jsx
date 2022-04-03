import React from 'react';
import QList from './QList';
import qListData from '../../data/serverData.js';

class QnA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product_id: qListData.product_id,
      listOfQuestions: qListData.results,
      numQsShowing: 2
      // numQsShowing: qListData.results.length
    };
  }

  // numofQsToRender = (props) => {
  //   this.setState({
  //     listOfQuestions: qListData.results.slice(0, 2)
  //   })
  // }

  render() {
    return (
      <div>
        <h3>QUESTIONS & ANSWERS</h3>
        <QList
          qList={this.state.listOfQuestions}
          numQs={this.state.numQsShowing}
        />
      </div>
    );
  }
}

export default QnA;
