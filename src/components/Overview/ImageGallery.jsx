import React from 'react';
// import 'font-awesome/css/font-awesome.min.css';

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    this.index = 0;
    this.state = {
      index: 0,
    };
    // this.selectedStyle = props.selectedStyle;
    // this.photos = this.selectedStyle.photos;
    // this.numPhotos = this.photos.length;
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick() {
    this.index = (this.index + 1) % this.numPhotos;
    document.getElementById(this.index).scrollIntoView({ behavior: 'smooth', inline: 'start' });
  }

  render() {
    const { selectedStyle } = this.props;
    const { photos } = selectedStyle;
    const numPhotos = photos.length;

    return (
      <>
        <button type="button" className="gallery-button" onClick={() => { this.handleOnClick(); }}>Click</button>

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
