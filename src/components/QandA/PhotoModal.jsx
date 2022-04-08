import React from 'react';
import { v4 as uuidv4 } from 'uuid';

class PhotoModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
    };
    this.handleSubmitPhotos = this.handleSubmitPhotos.bind(this);
    this.updatePhotoState = this.updatePhotoState.bind(this);
    this.closePhotoModal = this.closePhotoModal.bind(this);
  }

  handleSubmitPhotos(event) {
    event.preventDefault();
    this.updatePhotoState(event); // invokes helper func to update local state in prep to bundle
    //  photos with new answer to add at parent component level
    const { images } = this.state;
    const { attachPhotos } = this.props;
    if (images.length < 6) {
      // attach all photos to ans package, then subimt API call
      attachPhotos(images);
      this.closePhotoModal();
    } else {
      alert('Only submitting first 5 images.');
      const photoArr = attachPhotos(images.slice(0, 5));
      attachPhotos(photoArr);
      this.closeProtoModal();
    }
  }

  updatePhotoState(event) {
    const { images } = this.state;
    const storePrev = images.slice();
    storePrev.push(URL.createObjectURL(event.target.files[0]));
    this.setState({
      images: storePrev,
    });
  }

  closePhotoModal() {
    const { closePhotoModal } = this.props;
    closePhotoModal();
  }

  render() {
    const { images } = this.state;
    // console.log('images.length: ', images.length);

    return (
      <div className="backgroundPhotoModal">
        <div className="modalAddPhoto" onSubmit={this.handleSubmitPhotos}>
          <h5>Add Photo(s)</h5>
          <br />
          <p>Submit up to 5 photos with your answer.</p>
          <p>Note: If you uploaded more than 5 images, only the first 5 will be submitted.</p>
          <br />
          <input type="file" onChange={this.updatePhotoState} form="AddAnswer" />
          <br />
          <div>Thumbnail preview</div>
          <br />
          {images.length ? images.map((image) => (
            <img
              src={image}
              alt="user is uploading a visual"
              className="thumbnail"
              key={uuidv4()}
            />
          ))
            : null}
          <br />
          <input
            type="button"
            value="Attach your photos"
            onClick={this.handleSubmitPhotos}
          />
          {' '}
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
