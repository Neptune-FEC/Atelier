import React from 'react';

const { addQuestion } = require('../../helpers/HttpClient');

class AddQModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      nickName: '',
      email: '',
    };
    this.handleAddQSubmit = this.handleAddQSubmit.bind(this);
    this.onChangeQuestion = this.onChangeQuestion.bind(this);
    this.onChangeNickName = this.onChangeNickName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.closeAddQModal = this.closeAddQModal.bind(this);
  }

  handleAddQSubmit(event) {
    event.preventDefault();
    const { product, updateQsStateHelper } = this.props;
    const {
      question, nickName, email,
    } = this.state;
    if (question === '' || nickName === '' || email === '') {
      // eslint-disable-next-line no-alert
      alert(
        `You must enter the following:
      This error will occur if:
      1. Any mandatory fields are blank
      2. The email address provided is not in correct email format`,
      );
    } else {
      addQuestion(question, nickName, email, product.id)
        .then(() => updateQsStateHelper())
        .then(() => this.closeAddQModal())
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.warn('Error in submitting question.', err);
        });
    }
  }

  onChangeQuestion(event) {
    this.setState({ question: event.target.value });
  }

  onChangeNickName(event) {
    this.setState({ nickName: event.target.value });
  }

  onChangeEmail(event) {
    this.setState({ email: event.target.value });
  }

  closeAddQModal() {
    const { toggleAddQModal } = this.props;
    toggleAddQModal();
  }

  render() {
    const {
      question, nickName, email,
    } = this.state;
    const { product } = this.props;
    // console.log('ansList, AddQModal: ', ansList);

    return (
      <div className="backgroundAddQModal">
        <form
          className="modalAddQ"
          onSubmit={this.handleAddQSubmit}
        >
          <h4>Ask Your Question</h4>
          <br />
          <h5>
            About the
            {' '}
            {product.name}
            {' '}
          </h5>
          <br />
          <label htmlFor="a">
            Your Question (mandatory)&nbsp;
            <br />
            <textarea
              required
              type="text"
              maxLength="1000"
              value={question}
              onChange={this.onChangeQuestion}
              cols="40"
              rows="5"
            />
          </label>
          <br />
          <br />
          <label htmlFor="a">
            What is your nickname (mandatory)&nbsp;
            <input
              required
              type="text"
              maxLength="60"
              placeholder="Example: jackson11!"
              value={nickName}
              onChange={this.onChangeNickName}
            />
            <div>For privacy reasons, do not use your full name or email address</div>
          </label>
          <br />
          <label htmlFor="a">
            Your email (mandatory)&nbsp;
            <input
              required
              type="email"
              size="30"
              maxLength="60"
              placeholder="Example: jackson@email.com"
              value={email}
              onChange={this.onChangeEmail}
            />
            <div>For authentication reasons, you will not be emailed</div>
          </label>
          <br />
          <br />
          <input type="submit" value="Submit Answer" />
          {' '}
          <input
            type="button"
            value="Back"
            onClick={this.closeAddQModal}
          />
        </form>
      </div>
    );
  }
}

export default AddQModal;
