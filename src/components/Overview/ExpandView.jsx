import React from 'react';

class ExpandView extends React.Component {
  constructor(props) {
    super(props);
    this.indexImage = 0;
    this.state = {
      isZoom: false,
      mouseX: undefined,
      mouseY: undefined,
    };

    this.scrollImageLeft = this.scrollImageLeft.bind(this);
    this.scrollImageRight = this.scrollImageRight.bind(this);
    this.zoomImage = this.zoomImage.bind(this);
    this.moveMouseImg = this.moveMouseImg.bind(this);
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
    this.indexImage -= 1;
    document.getElementById(`expand${this.indexImage}`).scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }

  scrollImageRight() {
    this.indexImage += 1;
    document.getElementById(`expand${this.indexImage}`).scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }

  zoomImage() {
    const { isZoom } = this.state;
    this.setState({
      isZoom: !isZoom,
    });
  }

  render() {
    const { selectedStyle, handleExpand } = this.props;
    const { photos } = selectedStyle;
    const numPhotos = photos.length;
    const { isZoom, mouseX, mouseY } = this.state;

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
