import React from 'react';

class ExpandView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      limitNumPhotos: 3,
      isZoom: false,
      mouseX: undefined,
      mouseY: undefined,
    };

    this.scrollImageLeft = this.scrollImageLeft.bind(this);
    this.scrollImageRight = this.scrollImageRight.bind(this);
    this.zoomImage = this.zoomImage.bind(this);
    this.moveMouseImg = this.moveMouseImg.bind(this);
    this.changeImage = this.changeImage.bind(this);
  }

  moveMouseImg(e) {
    const x = (e.clientX / e.target.offsetWidth) * 100;
    const y = (e.clientY / e.target.offsetHeight) * 100;

    this.setState({
      mouseX: x,
      mouseY: y,
    });
  }

  scrollImageLeft() {
    const { indexImage, handleIndexImageLeft } = this.props;
    handleIndexImageLeft();
    document.getElementById(`expand${indexImage - 1}`).scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }

  scrollImageRight() {
    const { indexImage, handleIndexImageRight } = this.props;
    document.getElementById(`expand${indexImage + 1}`).scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    handleIndexImageRight();
  }

  changeImage(index) {
    document.getElementById(`expand${index}`).scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }

  zoomImage() {
    const { isZoom } = this.state;
    this.setState({
      isZoom: !isZoom,
    });
  }

  render() {
    const {
      selectedStyle, handleExpand, indexImage,
    } = this.props;
    const { photos } = selectedStyle;
    const numPhotos = photos.length;
    const {
      limitNumPhotos,
    } = this.state;
    const { isZoom, mouseX, mouseY } = this.state;

    return (
      <div className="expand-view-container">
        <i className="fa fa-close close-icon" role="presentation" onClick={handleExpand} />
        <div className="gallery-overlay expand-gallery-overlay">
          <div className="gallery-navigation">
            <i
              style={{ visibility: `${(indexImage > 0) ? 'visible' : 'hidden'}` }}
              role="presentation"
              className="gallery-icon-left fa fa-chevron-left navigation-icon"
              onClick={() => { this.scrollImageLeft(numPhotos); }}
            />
            <i
              style={{ visibility: `${indexImage < (numPhotos - 1) ? 'visible' : 'hidden'}` }}
              role="presentation"
              className="gallery-icon-left fa fa-chevron-right navigation-icon"
              onClick={() => { this.scrollImageRight(numPhotos); }}
            />
          </div>
        </div>
        <div
          id="gallery"
          className="gallery expand-view-gallery"
          role="presentation"
        >
          <div
            className="gallery-items"
            style={{ width: `${numPhotos}00%` }}
          >
            {photos.map((photo, idx) => (
              isZoom
                ? (
                  <div
                    key={`keys-expand${photo.url}`}
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
                    className="gallery-item expand-view-gallery-item"
                    id={`expand${idx}`}
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
