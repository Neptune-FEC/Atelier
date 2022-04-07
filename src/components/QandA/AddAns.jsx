import React from 'react';
import AnsModal from './AnsModal';

class AddAns extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowingAnsModal: false,
    };
    this.toggleAnsModal = this.toggleAnsModal.bind(this);
  }

  toggleAnsModal() {
    const { isShowingAnsModal } = this.state;
    this.setState({ isShowingAnsModal: !isShowingAnsModal });
  }

  render() {
    const { isShowingAnsModal } = this.state;
    // eslint-disable-next-line camelcase
    const { question_body, answers, product } = this.props;
    const ansList = Object.values(answers);
    // console.log('ansList, addAns: ', ansList);

    return (
      <span>
        {isShowingAnsModal
          ? (
            <AnsModal
              // eslint-disable-next-line camelcase
              question_body={question_body}
              ansList={ansList}
              product={product}
              toggleAnsModal={this.toggleAnsModal}
            />
          )
          : (
            <u
              role="button"
              tabIndex={0}
              onClick={this.toggleAnsModal}
              onKeyUp={this.toggleAnsModal}
            >
              Add Answer
            </u>
          )}
      </span>
    );
  }
}

export default AddAns;
