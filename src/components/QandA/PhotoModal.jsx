import React from 'react';

class PhotoModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleAddAnsSubmit = this.handleAddAnsSubmit.bind(this);
    this.hidePhotoModal = this.hidePhotoModal.bind(this);
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

  hidePhotoModal() {
    this.setState({ togglePhotoModal: false });
  }

  render() {
    // eslint-disable-next-line camelcase
    const {  } = this.props;
    console.log('ansList, AnsModal: ', this.props);

    return (
      <div className="backgroundAnsModal">

      </div>
    );
  }
}

export default PhotoModal;
