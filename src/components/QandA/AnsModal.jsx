import React from 'react';

class AnsModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: '',
      nickName: '',
      email: '',
    };
    this.handleAddAnsSubmit = this.handleAddAnsSubmit.bind(this);
    this.onChangeAnswer = this.onChangeAnswer.bind(this);
    this.onChangeNickName = this.onChangeNickName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
  }

  handleAddAnsSubmit(event) {
    event.preventDefault();
    const stateVals = Object.values(this.state);
    stateVals.forEach((value) => {
      if (value === '') {
        alert('Update proper input format. See BRD.');
      }
    });
    // envoke callback from ProductDetailPage level with API call to submit new answer
  }

  onChangeAnswer(event) {
    this.setState({ answer: event.taget.value });
  }

  onChangeNickName(event) {
    this.setState({ nickName: event.taget.value });
  }

  onChangeEmail(event) {
    this.setState({ email: event.taget.value });
  }

  render() {
    // eslint-disable-next-line camelcase
    const { question_body, product } = this.props;

    return (
      <form onSubmit={this.handleAddAnsSubmit}>
        <h4>Submit your Answer</h4>
        <h5>
          {product.name}
          :
          {' '}
          {/* eslint-disable-next-line camelcase */}
          {question_body}
        </h5>
        <label htmlFor="a">
          Your Answer (mandatory)&nbsp;
          <input
            type="text"
            maxLength="1000"
            onChange={this.onChangeAnswer}
          />
        </label>
        <br />
        <br />
        <label htmlFor="a">
          What is your nickname (mandatory)&nbsp;
          <input
            type="text"
            maxLength="60"
            placeholder="Example: jack543!"
            onChange={this.onChangeNickName}
          />
          <div>For authentication reasons, do not use your full name or email address</div>
        </label>
        <br />
        <label htmlFor="a">
          Your email (mandatory)&nbsp;
          <input
            type="text"
            maxLength="60"
            placeholder="Example: jack@email.com"
            onChange={this.onChangeEmail}
          />
          <div>For authentication reasons, you will not be emailed</div>
        </label>
        <br />
        <br />
        {/* integrate UploadPhoto component here */}
        <input type="submit" value="Submit Answer" />
      </form>
    );
  }
}

export default AnsModal;
