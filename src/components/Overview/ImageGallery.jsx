import React from 'react';

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    this.indexImage = 0;
    this.indexThumbnail = 2;
    this.state = {
    };
    // this.selectedStyle = props.selectedStyle;
    // this.photos = this.selectedStyle.photos;
    // this.numPhotos = this.photos.length;
    // this.handleOnClick = this.handleOnClick.bind(this);

    this.scrollImageLeft = this.scrollImageLeft.bind(this);
    this.scrollImageRight = this.scrollImageRight.bind(this);
    this.scrollThumbnailUp = this.scrollThumbnailUp.bind(this);
    this.scrollThumbnailDown = this.scrollThumbnailDown.bind(this);
    this.changeImage = this.changeImage.bind(this);
  }

  scrollImageLeft() {
    this.indexImage -= 1;
    document.getElementById(`img_${this.indexImage}`).scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }

  scrollImageRight() {
    this.indexImage += 1;
    document.getElementById(`img_${this.indexImage}`).scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }

  scrollThumbnailDown() {
    this.indexThumbnail += 1;
    document.getElementById(`thumbnail_${this.indexThumbnail}`).scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }

  scrollThumbnailUp() {
    this.indexThumbnail -= 1;
    document.getElementById(`thumbnail_${this.indexThumbnail}`).scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }

  changeImage(index) {
    document.getElementById(`img_${index}`).scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }

  render() {
    const { selectedStyle, handleExpand } = this.props;
    const { photos } = selectedStyle;
    const numPhotos = photos.length;

    return (
      <>
        <div
          className="gallery-overlay"
        >
          <div className="thumbnail-panel">
            <i
              role="presentation"
              className="thumbnail-icon fa fa-chevron-up navigation-icon"
              onClick={() => { this.scrollThumbnailUp(); }}
            />
            <div className="thumbnail-container">
              <div
                className="thumbnail-items"
                style={{ height: `${100 * (numPhotos / 3)}%` }}
              >
                {photos.map((photo, idx) => (
                  <div
                    id={`thumbnail_${idx}`}
                    className="thumbnail-item"
                    style={{ backgroundImage: `url(${photo.thumbnail_url})`, height: `${100 / (numPhotos / 3)}%` }}
                    role="presentation"
                    onClick={() => { this.changeImage(idx); }}
                  />
                ))}
              </div>
            </div>
            <i
              role="presentation"
              className="thumbnail-icon fa fa-chevron-down navigation-icon"
              onClick={() => { this.scrollThumbnailDown(); }}
            />
          </div>
          <div className="gallery-navigation">
            <i
              role="presentation"
              className="gallery-icon-left fa fa-chevron-left navigation-icon"
              onClick={() => { this.scrollImageLeft(); }}
            />
            <i
              role="presentation"
              className="gallery-icon-left fa fa-chevron-right navigation-icon"
              onClick={() => { this.scrollImageRight(); }}
            />
          </div>
        </div>
        <div
          className="gallery"
          role="presentation"
          onClick={() => { handleExpand(); }}
        >
          <div
            className="gallery-items"
            style={{ width: `${numPhotos}00%` }}
          >
            {photos.map((photo, idx) => (
              <div
                className="gallery-item"
                id={`img_${idx}`}
                style={{ backgroundImage: `url(${photo.url})`, width: `${100 / numPhotos}%` }}
              />
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default ImageGallery;
