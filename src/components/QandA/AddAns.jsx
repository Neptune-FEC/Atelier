import React from 'react';
import AnsModal from './AnsModal';

class AddAns extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleAnsModal: false,
    };
    this.showAnsModal = this.showAnsModal.bind(this);
  }

  showAnsModal() {
    const { toggleAnsModal } = this.state;
    this.setState({ toggleAnsModal: !toggleAnsModal });
    // toggleAnsModal();
  }

  render() {
    const { toggleAnsModal } = this.state;
    // eslint-disable-next-line camelcase
    const { question_body, product } = this.props;

    return (
      <span>
        {toggleAnsModal
          ? (
            <AnsModal
              // eslint-disable-next-line camelcase
              question_body={question_body}
              product={product}
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
