import React from 'react';
import AnsModal from './AnsModal';

class AddAns extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleAnsModal: false,
    };
    this.showAnsModal = this.showAnsModal.bind(this);
    this.hideAnsModal = this.hideAnsModal.bind(this);
  }

  showAnsModal() {
    this.setState({ toggleAnsModal: true });
  }

  hideAnsModal() {
    this.setState({ toggleAnsModal: false });
  }

  render() {
    const { toggleAnsModal } = this.state;
    // eslint-disable-next-line camelcase
    const { question_body, answers, product } = this.props;
    const ansList = Object.values(answers);
    // console.log('ansList, addAns: ', ansList);

    return (
      <span>
        {toggleAnsModal
          ? (
            <AnsModal
              // eslint-disable-next-line camelcase
              question_body={question_body}
              ansList={ansList}
              product={product}
              hideAnsModal={this.hideAnsModal}
            />
          )
          : (
            <u
              role="button"
              tabIndex={0}
              onClick={this.showAnsModal}
              onKeyUp={this.showAnsModal}
            >
              Add Answer
            </u>
          )}
      </span>
    );
  }
}

export default AddAns;
