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
      indexImage, handleIndexImageLeft,
      selectedStyle, handleIndexStyleMapping,
      setIndexThumbnail, indexThumbnail,
    } = this.props;
    const { photos } = selectedStyle;
    const numPhotos = photos.length;
    const { style_id } = selectedStyle;
    if (indexImage < (numPhotos - 2) && indexImage > 0) {
      document.getElementById(`thumbnail_${indexImage - 1}`).scrollIntoView({ inline: 'center', block: 'nearest' });
      setIndexThumbnail(Math.max(1, indexImage));
    }
    document.getElementById(`img_${indexImage - 1}`).scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    handleIndexStyleMapping(indexImage - 1, Math.max(indexThumbnail - 1, 1), style_id);
    handleIndexImageLeft();
  }

  scrollImageRight() {
    const {
      indexImage, handleIndexImageRight,
      handleIndexStyleMapping, selectedStyle, setIndexThumbnail, indexThumbnail,
    } = this.props;
    const { photos } = selectedStyle;
    const numPhotos = photos.length;
    const { style_id } = selectedStyle;
    if (indexImage < 3 && numPhotos > 2) {
      document.getElementById(`thumbnail_${indexImage + 3}`).scrollIntoView({ inline: 'center', block: 'nearest' });
    }
    document.getElementById(`img_${indexImage + 1}`).scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    handleIndexStyleMapping(indexImage + 1, Math.min(indexThumbnail + 1, 4), style_id);
    handleIndexImageRight();
    setIndexThumbnail(Math.min(indexImage + 1, 4));
  }

  scrollThumbnailDown() {
    const { indexThumbnail, handleIndexThumbnailDown } = this.props;
    document.getElementById(`thumbnail_${indexThumbnail + 2}`).scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    handleIndexThumbnailDown();
  }

  scrollThumbnailUp() {
    const { indexThumbnail, handleIndexThumbnailTop } = this.props;
    document.getElementById(`thumbnail_${indexThumbnail - 2}`).scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    handleIndexThumbnailTop();
  }

  changeImage(index) {
    const {
      setIndexImage, handleIndexStyleMapping, selectedStyle, indexThumbnail, setIndexThumbnail,
    } = this.props;
    const { style_id } = selectedStyle;
    document.getElementById(`img_${index}`).scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    setIndexImage(index);
    setIndexThumbnail(indexThumbnail);
    handleIndexStyleMapping(index, indexThumbnail, style_id);
  }

  render() {
    const {
      selectedStyle, handleExpand, indexImage, indexThumbnail, product,
    } = this.props;
    const { photos } = selectedStyle;
    const numPhotos = photos.length;
    const {
      limitNumPhotos,
    } = this.state;
    let noImage;
    if (product.id === 66643) {
      noImage = 'https://i.kym-cdn.com/entries/icons/original/000/028/926/cove3.jpg';
    } else {
      noImage = 'https://acttochange.org/wp-content/plugins/ninja-forms/assets/img/no-image-available-icon-6.jpg';
    }

    return (
      <>
        <div
          className="gallery-overlay"
          role="presentation"
        >
          <div className="thumbnail-panel">
            <i
              style={{ visibility: `${(indexThumbnail > 1) ? 'visible' : 'hidden'}` }}
              role="presentation"
              className="thumbnail-icon fa fa-chevron-up navigation-icon"
              onClick={() => { this.scrollThumbnailUp(numPhotos); }}
            />
            <div id="thumbnail-container">
              <div
                id="thumbnail-items"
                style={{ height: `${100 * Math.max((numPhotos / 3), 1)}%` }}
              >
                {photos.map((photo, idx) => (
                  <div
                    key={`${photo.url}`}
                    id={`thumbnail_${idx}`}
                    className="thumbnail-item"
                    style={{ height: `${100 / Math.max(numPhotos, 3)}%` }}
                  >
                    <div
                      className={`thumbnail-item-image ${idx === indexImage ? 'thumbnail-item-image-selected' : ''}`}
                      style={{
                        backgroundImage: `url(${photo.thumbnail_url === null ? noImage : photo.thumbnail_url})`,
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
          role="presentation"
          onClick={() => { handleExpand(); }}
        >
          <div
            className="gallery-items"
            style={{ width: `${numPhotos}00%` }}
          >
            {photos.map((photo, idx) => (
              <div
                key={`gallery-item${photo.url}`}
                className="gallery-item"
                id={`img_${idx}`}
                style={{ backgroundImage: `url(${(photo.url === null ? noImage : photo.url)}`, width: `${100 / numPhotos}%` }}
              />
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default ImageGallery;
