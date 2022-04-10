import React from 'react';

class ExpandView extends React.Component {
  constructor(props) {
    super(props);
    this.indexImage = 0;
    // this.indexThumbnail = 2;
    this.state = {
      isZoom: false,
      mouseX: undefined,
      mouseY: undefined,
    };
    // this.selectedStyle = props.selectedStyle;
    // this.photos = this.selectedStyle.photos;
    // this.numPhotos = this.photos.length;
    // this.handleOnClick = this.handleOnClick.bind(this);

    this.scrollImageLeft = this.scrollImageLeft.bind(this);
    this.scrollImageRight = this.scrollImageRight.bind(this);
    this.zoomImage = this.zoomImage.bind(this);
    this.moveMouseImg = this.moveMouseImg.bind(this);
    // this.scrollThumbnailUp = this.scrollThumbnailUp.bind(this);
    // this.scrollThumbnailDown = this.scrollThumbnailDown.bind(this);
  }

  moveMouseImg(e) {
    const x = (e.clientX / e.target.offsetWidth) * 100;
    const y = (e.clientY / e.target.offsetHeight) * 100;

    console.log('e.pageX, e.pageY', x, y);

    this.setState({
      mouseX: x,
      mouseY: y,
    });
  }

  scrollImageLeft() {
    this.indexImage -= 1;
    console.log('index', this.indexImage);
    document.getElementById(`expand${this.indexImage}`).scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }

  scrollImageRight() {
    this.indexImage += 1;
    console.log('index', this.indexImage);
    document.getElementById(`expand${this.indexImage}`).scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }

  zoomImage() {
    console.log('zoom zoom zoom');
    const { isZoom } = this.state;
    this.setState({
      isZoom: !isZoom,
    });
  }

  // scrollThumbnailDown() {
  //   this.indexThumbnail += 1;
  //   document.getElementById(`id${this.indexThumbnail}`).scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  // }

  // scrollThumbnailUp() {
  //   this.indexThumbnail -= 1;
  //   document.getElementById(`id${this.indexThumbnail}`).scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  // }

  render() {
    const { selectedStyle, handleExpand } = this.props;
    const { photos } = selectedStyle;
    const numPhotos = photos.length;
    const { isZoom, mouseX, mouseY } = this.state;
    // const transform = {
    //   transformOrigin: `${mouseX}% ${mouseY}%`,
    // };
    // const classes = Object.assign(transform);

    return (
      <div className="expand-view-container">
        <i className="fa fa-close close-icon" role="presentation" onClick={handleExpand} />
        <div className="gallery-overlay expand-gallery-overlay">
          <div className="gallery-navigation">
            <i role="presentation" className="gallery-icon-left fa fa-chevron-left navigation-icon" onClick={() => { this.scrollImageLeft(); }} />
            <i role="presentation" className="gallery-icon-left fa fa-chevron-right navigation-icon" onClick={() => { this.scrollImageRight(); }} />
          </div>
        </div>
        <div className="gallery expand-view-gallery">
          <div className="gallery-items" style={{ width: `${numPhotos}00%` }}>
            {photos.map((photo, idx) => (
              isZoom
                ? (
                  <div
                    id={`expand${idx}`}
                    className="gallery-item expand-view-gallery-item zoom-image"
                    style={{
                      backgroundImage: `url(${photo.url})`, width: `${100 / numPhotos}%`, backgroundPosition: `${mouseX}% ${mouseY}%`,
                    }}
                    alt="dmsak"
                    onMouseMove={this.moveMouseImg}
                    role="presentation"
                    onClick={() => {
                      this.zoomImage();
                    }}
                  />
                )
                : (
                  <div
                    id={`expand${idx}`}
                    className="gallery-item expand-view-gallery-item"
                    style={{ backgroundImage: `url(${photo.url})`, width: `${100 / numPhotos}%` }}
                    role="presentation"
                    onClick={() => {
                      this.zoomImage();
                    }}
                  />
                )
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default ExpandView;
