import React from 'react';
import Question from './Question';
import AddQModal from './AddQModal';

class QList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isQsViewExpanded: false,
      numQsShowing: 2,
      showAddQModal: false,
    };
    this.expandQsAccordion = this.expandQsAccordion.bind(this);
    this.toggleAddQModal = this.toggleAddQModal.bind(this);
  }

  expandQsAccordion() {
    const { isQsViewExpanded, numQsShowing } = this.state;
    const moreQs = numQsShowing + 2;
    this.setState({ isQsViewExpanded: !isQsViewExpanded, numQsShowing: moreQs });
  }

  toggleAddQModal() {
    const { showAddQModal } = this.state;
    this.setState({ showAddQModal: !showAddQModal });
  }

  render() {
    const {
      qList, updateQsStateHelper, product, qSearch,
    } = this.props;
    const { numQsShowing, showAddQModal } = this.state;
    let listOfQuestions = [];
    if (qSearch.length > 2) {
      listOfQuestions = qList.filter((q) => q.question_body.includes(qSearch));
    } else {
      listOfQuestions = qList;
    }
    // console.log('listOfQuestions, QList: ', listOfQuestions);

    return (
      <div className="qListMain">
        {showAddQModal
          ? (
            <AddQModal
              toggleAddQModal={this.toggleAddQModal}
              updateQsStateHelper={updateQsStateHelper}
              product={product}
            />
          )
          : null}
        <div className="qList">
          {listOfQuestions.slice(0, numQsShowing).map(((q) => (
            <Question
              question={q}
              updateQsStateHelper={updateQsStateHelper}
              key={q.question_id}
              product={product}
            />
          )
          ))}
        </div>
        <div className="qListFooter">
          {showAddQModal
            ? <button type="button" className="addQsButton clickable">Add a Question</button>
            : <button type="button" className="addQsButton clickable" onClick={this.toggleAddQModal}>Add a Question</button>}
          {qList.length > numQsShowing || qList.length <= 2
            ? <button type="button" className="moreQsButton clickable" onClick={this.expandQsAccordion}>More Answered Questions</button> : null}

        </div>
      </div>
    );
  }
}

export default QList;
