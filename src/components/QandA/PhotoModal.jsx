import React from 'react';
import { v4 as uuidv4 } from 'uuid';

class PhotoModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // thumbnailPrev: [],
      images: [],
    };
    this.handleSubmitPhotos = this.handleSubmitPhotos.bind(this);
    this.updateImagesState = this.updateImagesState.bind(this);
    this.closePhotoPopup = this.closePhotoPopup.bind(this);
  }

  handleSubmitPhotos(event) {
    event.preventDefault();
    const { images } = this.state;
    const { attachPhotos } = this.props;
    if (images.length < 6) {
      // callback to AnsModal: attach all photos to the ans state package
      attachPhotos(images);
      this.closePhotoPopup();
    } else {
      alert('Only submitting first 5 images.');
      const photoArr = images.slice(0, 5);
      attachPhotos(photoArr);
      this.closePhotoPopup();
    }
  }

  updateImagesState(event) {
    const { images } = this.state;
    const storePrev = images.slice();
    storePrev.push(URL.createObjectURL(event.target.files[0]));
    this.setState({
      images: storePrev,
    });
  }

  closePhotoPopup() {
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
          <input
            type="file"
            multiple
            form="AddAnswer"
            onChange={this.updateImagesState}
          />
          <br />
          <div>Thumbnail preview</div>
          <br />
          {images.length ? images.map((image) => (
            <img
              src={image}
              alt="user uploaded a visual"
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
            onClick={this.closePhotoPopup}
          />
        </div>
      </div>
    );
  }
}

export default PhotoModal;
