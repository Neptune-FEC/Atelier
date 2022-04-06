import React from 'react';
// import 'font-awesome/css/font-awesome.min.css';

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    this.index = 0;
    this.state = {
      index: 0,
    };
    this.selectedStyle = props.selectedStyle;
    this.photos = this.selectedStyle.photos;
    this.numPhotos = this.photos.length;
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick() {
    this.index = (this.index + 1) % this.numPhotos;
    document.getElementById(this.index).scrollIntoView({ behavior: 'smooth', inline: 'start' });
  }

  render() {
    return (
      <>
        <button type="button" className="gallery-button" onClick={() => { this.handleOnClick(); }}>Click</button>

        <div className="gallery">

          <div className="gallery-items" style={{ width: `${this.numPhotos}00%` }}>
            {this.photos.map((photo, idx) => <div id={idx} className="gallery-item" style={{ backgroundImage: `url(${photo.url})`, width: `${100 / this.numPhotos}%` }} />)}
            {/* <div id="f" className="gallery-item" style={{ backgroundColor: 'blue' }}>2</div>
          <div id="g" className="gallery-item" style={{ backgroundColor: 'gray' }}>2</div> */}
          </div>
        </div>
      </>
    );
  }
}

export default ImageGallery;
