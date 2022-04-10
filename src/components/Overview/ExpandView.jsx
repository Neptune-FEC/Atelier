import React from 'react';

class ExpandView extends React.Component {
  constructor(props) {
    super(props);
    this.indexImage = 0;
    // this.indexThumbnail = 2;
    this.state = {
      index: 0,
    };
    this.selectedStyle = props.selectedStyle;
    this.photos = this.selectedStyle.photos;
    this.numPhotos = this.photos.length;
    this.scrollImage = this.scrollImage.bind(this);
  }

  scrollImage() {
    this.indexImage = (this.indexImage + 1) % this.numPhotos;
    document.getElementById(`expand${this.indexImage}`).scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }

  render() {
    return (
      <div className="expand-view-container">
        <i role="presentation" className="gallery-icon-left fa fa-chevron-left expand-view-icon-left" onClick={() => { this.scrollImage(); }} />
        <div className="expand-view-gallery">
          <div className="gallery-items expand-view-gallery-items" style={{ width: `${this.numPhotos}00%` }}>
            {this.photos.map((photo, idx) => <div id={`expand${idx}`} className="gallery-item expand-view-gallery-item" style={{ backgroundImage: `url(${photo.url})`, width: `${100 / this.numPhotos}%` }} />)}
          </div>
        </div>
      </div>
    );
  }
}

export default ExpandView;
