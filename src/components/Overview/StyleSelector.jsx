import React from 'react';

function StyleSelector(props) {
  const {
    indexStyleMapping, setIndexImage, setIndexThumbnail,
    styles, selectedStyle, handleClick, handleStyleSelect, handleSizeSelect,
    handleQuantitySelect, handleIndexStyleMapping,
  } = props;
  function disPlayImage(styleId) {
    const [imageIndex, thumbnailIndex] = indexStyleMapping[styleId];
    setIndexImage(imageIndex);
    setIndexThumbnail(thumbnailIndex);
    if (imageIndex <= 4) {
      document.getElementById(`thumbnail_${thumbnailIndex - 1}`).scrollIntoView({ inline: 'center', block: 'nearest' });
    }
    document.getElementById(`img_${imageIndex}`).scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
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
