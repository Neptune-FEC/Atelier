import React from 'react';

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      limitNumPhotos: 3,
    };

    this.scrollImageLeft = this.scrollImageLeft.bind(this);
    this.scrollImageRight = this.scrollImageRight.bind(this);
    this.scrollThumbnailUp = this.scrollThumbnailUp.bind(this);
    this.scrollThumbnailDown = this.scrollThumbnailDown.bind(this);
    this.changeImage = this.changeImage.bind(this);
  }

  scrollImageLeft() {
    const {
      indexImage, handleIndexImageLeft, selectedStyle, handleIndexStyleMapping,
    } = this.props;
    const { style_id } = selectedStyle;
    handleIndexImageLeft();
    document.getElementById(`img_${indexImage - 1}`).scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    handleIndexStyleMapping(indexImage - 1, style_id);
  }

  scrollImageRight() {
    const {
      indexImage, handleIndexImageRight, handleIndexStyleMapping, selectedStyle,
    } = this.props;
    const { style_id } = selectedStyle;
    document.getElementById(`img_${indexImage + 1}`).scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    handleIndexImageRight();
    handleIndexStyleMapping(indexImage + 1, style_id);
  }

  scrollThumbnailDown() {
    const { indexThumbnail, handleIndexThumbnailDown } = this.props;
    console.log(indexThumbnail);
    document.getElementById(`thumbnail_${indexThumbnail + 2}`).scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    handleIndexThumbnailDown();
  }

  scrollThumbnailUp() {
    const { indexThumbnail, handleIndexThumbnailTop } = this.props;
    document.getElementById(`thumbnail_${indexThumbnail - 2}`).scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    handleIndexThumbnailTop();
  }

  changeImage(index) {
    const { setIndexImage, handleIndexStyleMapping, selectedStyle } = this.props;
    const { style_id } = selectedStyle;
    document.getElementById(`img_${index}`).scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    setIndexImage(index);
    handleIndexStyleMapping(index, style_id);
  }

  render() {
    const {
      selectedStyle, handleExpand, indexImage, indexThumbnail, indexStyleMapping,
    } = this.props;

    console.log('indexStyleMapping', indexStyleMapping);
    const { photos } = selectedStyle;
    const numPhotos = photos.length;
    const {
      limitNumPhotos,
    } = this.state;

    return (
      <>
        <div
          className="gallery-overlay"
        >
          <div className="thumbnail-panel">
            {/* {((numPhotos > limitNumPhotos) && isVisibleTop) ? ( */}
            <i
              style={{ visibility: `${(indexThumbnail > 1) ? 'visible' : 'hidden'}` }}
              role="presentation"
              className="thumbnail-icon fa fa-chevron-up navigation-icon"
              onClick={() => { this.scrollThumbnailUp(numPhotos); }}
            />
            {/* // ) */}
            {/* //   : (<div className="thumbnail-icon navigation-icon" />)} */}
            <div className="thumbnail-container">
              <div
                className="thumbnail-items"
                style={{ height: `${100 * Math.max((numPhotos / 3), 1)}%` }}
              >
                {photos.map((photo, idx) => (
                  <div
                    id={`thumbnail_${idx}`}
                    className="thumbnail-item"
                    style={{ height: `${100 / Math.max(numPhotos, 3)}%` }}
                  >
                    <div
                      className="thumbnail-item-image"
                      style={{
                        backgroundImage: `url(${photo.thumbnail_url})`,
                      }}
                      role="presentation"
                      onClick={() => { this.changeImage(idx); }}
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* {((numPhotos > limitNumPhotos) && isVisibleTop) ? ( */}
            <i
              style={{ visibility: `${indexThumbnail < (numPhotos - 2) ? 'visible' : 'hidden'}` }}
              role="presentation"
              className="thumbnail-icon fa fa-chevron-down navigation-icon"
              onClick={() => { this.scrollThumbnailDown(numPhotos); }}
            />
            {/* )
              : (<div className="thumbnail-icon navigation-icon" />)} */}
          </div>
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
