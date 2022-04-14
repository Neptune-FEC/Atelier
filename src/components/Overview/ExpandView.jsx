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
    const {
      indexImage, handleIndexImageLeft,
      selectedStyle, handleIndexStyleMapping,
      setIndexThumbnail, indexThumbnail,
    } = this.props;
    const { style_id } = selectedStyle;
    if (indexImage < 4 && indexImage > 0) {
      document.getElementById(`thumbnail_${indexImage - 1}`).scrollIntoView({ inline: 'center', block: 'nearest' });
      setIndexThumbnail(Math.max(1, indexImage));
    }
    document.getElementById(`expand${indexImage - 1}`).scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    handleIndexStyleMapping(indexImage - 1, Math.max(indexThumbnail - 1, 1), style_id);
    handleIndexImageLeft();
  }

  scrollImageRight() {
    const {
      indexImage, handleIndexImageRight,
      handleIndexStyleMapping, selectedStyle, setIndexThumbnail, indexThumbnail,
    } = this.props;
    const { style_id } = selectedStyle;
    if (indexImage < 3) {
      document.getElementById(`thumbnail_${indexImage + 3}`).scrollIntoView({ inline: 'center', block: 'nearest' });
    }
    document.getElementById(`expand${indexImage + 1}`).scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    handleIndexStyleMapping(indexImage + 1, Math.min(indexThumbnail + 1, 4), style_id);
    handleIndexImageRight();
    setIndexThumbnail(Math.min(indexImage + 1, 4));
  }

  changeImage(index) {
    const {
      setIndexImage, handleIndexStyleMapping, selectedStyle, indexThumbnail, setIndexThumbnail,
    } = this.props;
    const { style_id } = selectedStyle;
    document.getElementById(`expand${index}`).scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    setIndexImage(index);
    setIndexThumbnail(indexThumbnail);
    handleIndexStyleMapping(index, indexThumbnail, style_id);
  }

  changeImageDefault(imageIndex) {
    const {
      selectedStyle, setIndexImage, setIndexThumbnail, handleIndexStyleMapping,
    } = this.props;
    const { photos } = selectedStyle;
    const { style_id } = selectedStyle;
    const numPhotos = photos.length;
    const scrollHeight = document.getElementById('thumbnail-items').clientHeight;
    document.getElementById('thumbnail-container').scrollTop = ((imageIndex - 1) * scrollHeight) / numPhotos;
    document.getElementById(`img_${imageIndex}`).scrollIntoView({ inline: 'center', block: 'nearest' });
    setIndexImage(imageIndex);
    setIndexThumbnail(imageIndex);
    handleIndexStyleMapping(imageIndex, imageIndex, style_id);
  }

  zoomImage() {
    const { isZoom } = this.state;
    this.setState({
      isZoom: !isZoom,
    });
  }

  render() {
    const {
      selectedStyle, handleExpand, indexImage, handleClick,
    } = this.props;
    const { photos } = selectedStyle;
    const numPhotos = photos.length;
    const {
      limitNumPhotos,
    } = this.state;
    const { isZoom, mouseX, mouseY } = this.state;

    return (
      <div
        className="expand-view-container"
        role="presentation"
        onClick={(e) => { handleClick(e, 'Overview'); }}
      >
        <i className="fa fa-close close-icon" role="presentation" onClick={() => { handleExpand(); this.changeImageDefault(indexImage); }} style={{ visibility: `${isZoom ? 'hidden' : 'visible'}` }} />
        <div className="gallery-overlay expand-gallery-overlay">
          <div className="gallery-navigation">
            <i
              style={{ visibility: `${((indexImage > 0) && !isZoom) ? 'visible' : 'hidden'}` }}
              role="presentation"
              className="gallery-icon-left fa fa-chevron-left navigation-icon expand-view-icon"
              onClick={() => { this.scrollImageLeft(numPhotos); }}
            />
            <i
              style={{ visibility: `${(indexImage < (numPhotos - 1) && !isZoom) ? 'visible' : 'hidden'}` }}
              role="presentation"
              className="gallery-icon-left fa fa-chevron-right navigation-icon expand-view-icon"
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
        <div className="dot-container" style={{ visibility: `${isZoom ? 'hidden' : 'visible'}` }}>
          {photos.map((photo, idx) => <i className="fa fa-circle dot-icon navigation-icon " role="presentation" onClick={() => { this.changeImage(idx); }} style={{ color: `${idx === indexImage ? '#E66A35' : '#ffff'}` }} />)}
        </div>
      </div>
    );
  }
}

export default ExpandView;
