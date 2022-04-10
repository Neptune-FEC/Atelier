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
      qList, updateQsStateHelper, product,
    } = this.props;
    const { numQsShowing, showAddQModal } = this.state;
    // console.log('product, QList: ', product);

    return (
      <div>
        <div className="qList">
          {showAddQModal
            ? (
              <AddQModal
                toggleAddQModal={this.toggleAddQModal}
                updateQsStateHelper={updateQsStateHelper}
                product={product}
              />
            )
            : null}
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
        <div>
          {qList.length > numQsShowing || qList.length <= 2
            ? <button type="button" className="moreQsButton" onClick={this.expandQsAccordion}>More Answered Questions</button> : null}
          <div>
            {showAddQModal
              ? <button type="button" className="addQsButton">Add a Question</button>
              : <button type="button" className="addQsButton" onClick={this.toggleAddQModal}>Add a Question</button>}
          </div>
        </div>
      </div>
    );
  }
}

export default QList;
