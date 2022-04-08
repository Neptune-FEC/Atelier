import React from 'react';
import Question from './Question';

class QList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isQsViewExpanded: false,
      numQsShowing: 2,
      showAddQModal: false,
    };

    this.expandQsAccordion = this.expandQsAccordion.bind(this);
    this.addQ = this.addQ.bind(this);
  }

  expandQsAccordion() {
    const { isQsViewExpanded, numQsShowing } = this.state;
    const moreQs = numQsShowing + 2;
    this.setState({ isQsViewExpanded: !isQsViewExpanded, numQsShowing: moreQs });
  }

  addQ() {
    const { showAddQModal } = this.state;
    this.setState({ showAddQModal: !showAddQModal });
  }

  render() {
    const {
      qList, updateQsStateHelper, product,
    } = this.props;
    const { numQsShowing, showAddQModal } = this.state;

    return (
      <div>
        <div className="qList">
          {/* {showAddQModal
            ? <AddQ /> : null} */}
          {qList.slice(0, numQsShowing).map(((q) => (
            <Question
              question={q}
              updateQsStateHelper={updateQsStateHelper}
              key={q.question_id}
              product={product}
            />
          )
          ))}
        </div>
        <div className="qButtons">
          {qList.length > numQsShowing || qList.length <= 2
            ? <button type="button" className="moreQsButton" onClick={this.expandQsAccordion}>More Answered Questions</button> : null}

          <button type="button" className="addQsButton" onClick={this.addQ}>Add a Question</button>
        </div>
      </div>
    );
  }
}

export default QList;
