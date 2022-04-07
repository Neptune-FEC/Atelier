import React from 'react';

class PhotoModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      images: [],
    };
    this.handleSubmitPhotos = this.handleSubmitPhotos.bind(this);
    this.handleUploadPhoto = this.handleUploadPhoto.bind(this);
    this.closePhotoModal = this.closePhotoModal.bind(this);
  }

  handleUploadPhoto(event) {
    this.setState(() => ({
      image: URL.createObjectURL(event.target.files[0]),
    }));
    this.setState((oldState) => ({
      images: oldState.images.push(oldState.image),
    }));
  }

  handleSubmitPhotos(event) {
    event.preventDefault();
    const { images } = this.state;
    const { attachPhotos } = this.props;
    if (images.length < 6) {
      attachPhotos(images);
    } else {
      alert('Only submitting first 5 images.');
      attachPhotos(images.slice(0, 5));
    }
  }

  closePhotoModal() {
    const { togglePhotoModal } = this.props;
    togglePhotoModal();
  }

  render() {
    const { images } = this.state;
    // console.log('ansList, AnsModal: ', this.props);

    return (
      <div className="backgroundPhotoModal">
        <div className="modalAddPhoto" onSubmit={this.handleSubmitPhotos}>
          <h5>Add Photo(s)</h5>
          <br />
          <p>Submit up to 5 photos with your answer.</p>
          <p>Note: If you uploaded more than 5 images, only the first 5 will be submitted.</p>
          <br />
          <input type="file" onChange={this.handleUploadPhoto} form="AddAnswer" />
          <br />
          <div>Thumbnail previews</div>
          <br />
          {images.length > 1
            ? images.map((image) => <img src={image} alt="user is uploading a visual" />)
            : null}
          <br />
          <input
            type="button"
            value="Back"
            onClick={this.closePhotoModal}
          />
        </div>
      </div>
    );
  }
}

export default PhotoModal;
