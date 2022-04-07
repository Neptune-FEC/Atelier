import React from 'react';
import PhotoModal from './PhotoModal';

class AnsModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: '',
      nickName: '',
      email: '',
      photos: [],
      isShowingPhotoModal: false,
    };
    this.handleAddAnsSubmit = this.handleAddAnsSubmit.bind(this);
    this.onChangeAnswer = this.onChangeAnswer.bind(this);
    this.onChangeNickName = this.onChangeNickName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.togglePhotoModal = this.togglePhotoModal.bind(this);
    this.closeAnsModal = this.closeAnsModal.bind(this);
  }

  handleAddAnsSubmit(event) {
    event.preventDefault();
    // update to consider empty arr for photos and isShowingPhMod false
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

  togglePhotoModal() {
    const { isShowingPhotoModal } = this.state;
    this.setState({ isShowingPhotoModal: !isShowingPhotoModal });
  }

  closeAnsModal() {
    const { toggleAnsModal } = this.props;
    toggleAnsModal();
  }

  render() {
    const { isShowingPhotoModal } = this.state;
    // eslint-disable-next-line camelcase
    const { question_body, product } = this.props;
    // console.log('ansList, AnsModal: ', ansList);

    return (
      <div className="backgroundAnsModal">
        <form
          className="modalAddAns"
          id="addAnswer"
          onSubmit={this.handleAddAnsSubmit}
        >
          <h4>Submit your Answer</h4>
          <br />
          <h5>
            {product.name}
            :
            {' '}
            {/* eslint-disable-next-line camelcase */}
            {question_body}
          </h5>
          <br />
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
          {isShowingPhotoModal ? (
            <PhotoModal
              togglePhotoModal={this.togglePhotoModal}
            />
          )
            : (
              <input
                type="button"
                value="Upload your photos"
                onClick={this.togglePhotoModal}
              />
            )}
          <br />
          <input type="submit" value="Submit Answer" />
          {' '}
          <input
            type="button"
            value="Back"
            onClick={this.closeAnsModal}
          />
        </form>
      </div>
    );
  }
}

export default AnsModal;
