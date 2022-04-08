import React from 'react';
import PhotoModal from './PhotoModal';

const { addAnswer } = require('../../helpers/HttpClient');

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
    this.attachPhotos = this.attachPhotos.bind(this);
    this.closePhotoModal = this.closePhotoModal.bind(this);
    this.closeAnsModal = this.closeAnsModal.bind(this);
  }

  handleAddAnsSubmit(event) {
    event.preventDefault();
    const { questionId } = this.props;
    const {
      answer, nickName, email, photos,
    } = this.state;
    if (answer === '' || nickName === '' || email === '') {
      // eslint-disable-next-line no-alert
      alert(
        `You must enter the following:
      This error will occur if:
      1. Any mandatory fields are blank
      2. The email address provided is not in correct email format
      3. The images selected are invalid of unable to be uploaded.`,
      );
    } else {
      addAnswer(questionId, answer, nickName, email, photos)
        .then(() => this.closeAnsModal())
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.warn('Error in submitting answer.', err);
        });
    }
  }

  onChangeAnswer(event) {
    this.setState({ answer: event.target.value });
  }

  onChangeNickName(event) {
    this.setState({ nickName: event.target.value });
  }

  onChangeEmail(event) {
    this.setState({ email: event.target.value });
  }

  attachPhotos(images) { // callback from PhotoModal
    this.setState({ photos: images });
  }

  closePhotoModal() {
    const { isShowingPhotoModal } = this.state;
    this.setState({ isShowingPhotoModal: !isShowingPhotoModal });
  }

  closeAnsModal() {
    const { toggleAnsModal } = this.props;
    toggleAnsModal();
  }

  render() {
    const {
      answer, nickName, email, isShowingPhotoModal,
    } = this.state;
    const { questionBody, product } = this.props;
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
            {questionBody}
          </h5>
          <br />
          <label htmlFor="a">
            Your Answer (mandatory)&nbsp;
            <input
              required
              type="text"
              maxLength="1000"
              value={answer}
              onChange={this.onChangeAnswer}
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
              placeholder="Example: jack543!"
              value={nickName}
              onChange={this.onChangeNickName}
            />
            <div>For authentication reasons, do not use your full name or email address</div>
          </label>
          <br />
          <label htmlFor="a">
            Your email (mandatory)&nbsp;
            <input
              required
              type="email"
              size="30"
              maxLength="60"
              placeholder="Example: jack@email.com"
              value={email}
              onChange={this.onChangeEmail}
            />
            <div>For authentication reasons, you will not be emailed</div>
          </label>
          <br />
          {isShowingPhotoModal ? (
            <PhotoModal
              closePhotoModal={this.closePhotoModal}
              attachPhotos={this.attachPhotos}
            />
          )
            : (
              <input
                type="button"
                value="Upload your photos"
                onClick={this.closePhotoModal}
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
