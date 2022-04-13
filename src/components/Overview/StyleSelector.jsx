import React from 'react';

function StyleSelector(props) {
  const {
    indexStyleMapping, setIndexImage, setIndexThumbnail,
    styles, selectedStyle, handleClick, handleStyleSelect, handleSizeSelect,
    handleQuantitySelect,
  } = props;
  const { photos } = selectedStyle;
  const numPhotos = photos.length;
  function disPlayImage(styleId) {
    const [imageIndex, thumbnailIndex] = indexStyleMapping[styleId];
    const scrollHeight = document.getElementById('thumbnail-items').clientHeight;
    document.getElementById('thumbnail-container').scrollTop = ((thumbnailIndex - 1) * scrollHeight) / numPhotos;
    document.getElementById(`img_${imageIndex}`).scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    setIndexImage(imageIndex);
    setIndexThumbnail(thumbnailIndex);
  }
  function handleStyleClick(style) {
    handleStyleSelect(style);
    handleSizeSelect(null, null);
    handleQuantitySelect(null);
    disPlayImage(style.style_id);
  }

  const allStyles = styles.results;
  return (
    <div className="overview-styles" role="presentation" onClick={(e) => { handleClick(e, 'StyleSelector'); }}>
      <span style={{ color: 'var(--text-color)', fontWeight: 'bold', fontSize: '1.3rem' }}>
        Styles
        {' '}
        {'>'}
        {' '}
      </span>
      <span style={{ fontSize: '1.3rem' }}>
        {selectedStyle.name}
      </span>
      <div className="style-thumbnails">
        {allStyles.map((style) => (
          <div key={style.style_id} className="style-thumbnail-container">
            <div
              role="presentation"
              className={`style-thumbnail ${selectedStyle === style ? 'style-thumbnail-selected' : ''}`}
              onClick={() => handleStyleClick(style)}
              style={{ backgroundImage: `url(${style.photos[0].thumbnail_url}` }}
            />
            {selectedStyle === style ? <i className="check-icon-visible fa fa-check-circle" /> : <div />}
          </div>
        ))}
      </div>

    </div>
  );
}

export default StyleSelector;
