import React from 'react';
import QList from './QList';
import qListData from '../../data/serverData';

class QnA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // product_id: qListData.product_id,
      listOfQuestions: qListData.results,
      numQsShowing: 2,
      // numQsShowing: qListData.results.length
    };
  }

  // numofQsToRender = (props) => {
  //   this.setState({
  //     listOfQuestions: qListData.results.slice(0, 2)
  //   })
  // }

  render() {
    const { listOfQuestions, numQsShowing } = this.state;

    return (
      <div>
        <h3>QUESTIONS & ANSWERS</h3>
        <QList
          qList={listOfQuestions}
          numQs={numQsShowing}
        />
      </div>
    );
  }
}

export default QnA;
