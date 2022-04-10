import React from 'react';
import ExpandView from './ExpandView';

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    this.indexImage = 0;
    this.indexThumbnail = 2;
    this.state = {
      index: 0,
    };
    // this.selectedStyle = props.selectedStyle;
    // this.photos = this.selectedStyle.photos;
    // this.numPhotos = this.photos.length;
    // this.handleOnClick = this.handleOnClick.bind(this);

    this.scrollImageLeft = this.scrollImageLeft.bind(this);
    this.scrollImageRight = this.scrollImageRight.bind(this);
    this.scrollThumbnailUp = this.scrollThumbnailUp.bind(this);
    this.scrollThumbnailDown = this.scrollThumbnailDown.bind(this);
  }

  scrollImageLeft() {
    this.indexImage -= 1;
    document.getElementById(this.indexImage).scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }

  scrollImageRight() {
    this.indexImage += 1;
    document.getElementById(this.indexImage).scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }

  scrollThumbnailDown() {
    this.indexThumbnail += 1;
    document.getElementById(`id${this.indexThumbnail}`).scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }

  scrollThumbnailUp() {
    this.indexThumbnail -= 1;
    document.getElementById(`id${this.indexThumbnail}`).scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }

  render() {
    const { selectedStyle } = this.props;
    const { photos } = selectedStyle;
    const numPhotos = photos.length;

    return (
      <>
        <div className="gallery-overlay">
          <div className="thumbnail-panel">
            <i role="presentation" className="thumbnail-icon fa fa-chevron-up" onClick={() => { this.scrollThumbnailUp(); }} />
            <div className="thumbnail-container">
              <div className="thumbnail-items" style={{ height: `${100 * (numPhotos / 3)}%` }}>
                {photos.map((photo, idx) => <div id={`id${idx}`} className="thumbnail-item" style={{ backgroundImage: `url(${photo.thumbnail_url})`, height: `${100 / (numPhotos / 3)}%` }} />)}
              </div>
            </div>
            {/* <div className="thumbnail-navigation"> */}
            <i role="presentation" className="thumbnail-icon fa fa-chevron-down" onClick={() => { this.scrollThumbnailDown(); }} />
            {/* </div> */}

          </div>
          <div className="gallery-navigation">


            {/*  <div className="gallery-items" style={{ width: `${numPhotos}00%` }}>
            {photos.map((photo, idx) => <div id={idx} className="gallery-item" style={{ backgroundImage: `url(${photo.url})`, width: `${100 / numPhotos}%` }} />)} */}

            <i role="presentation" className="gallery-icon-left fa fa-chevron-left" onClick={() => { this.scrollImageLeft(); }} />
            <i role="presentation" className="gallery-icon-left fa fa-chevron-right" onClick={() => { this.scrollImageRight(); }} />
          </div>
        </div>
        <div className="gallery">
          <div className="gallery-items" style={{ width: `${numPhotos}00%` }}>
            {photos.map((photo, idx) => <div id={idx} className="gallery-item" style={{ backgroundImage: `url(${photo.url})`, width: `${100 / numPhotos}%` }} />)}

            {/* <div id="f" className="gallery-item" style={{ backgroundColor: 'blue' }}>2</div>
          <div id="g" className="gallery-item" style={{ backgroundColor: 'gray' }}>2</div> */}
          </div>
        </div>
      </>
    );
  }
}

export default ImageGallery;
