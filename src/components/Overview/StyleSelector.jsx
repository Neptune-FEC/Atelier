import React from 'react';

function StyleSelector(props) {
  const {
    indexStyleMapping, setIndexImage, setIndexThumbnail,
    styles, selectedStyle, handleStyleSelect, handleSizeSelect,
    handleQuantitySelect, product,
  } = props;
  const { photos } = selectedStyle;
  const numPhotos = photos.length;
  function disPlayImage(styleId) {
    const [imageIndex, thumbnailIndex] = indexStyleMapping[styleId];
    const scrollHeight = document.getElementById('thumbnail-items').clientHeight;
    document.getElementById('thumbnail-container').scrollTop = ((thumbnailIndex - 1) * scrollHeight) / numPhotos;
    document.getElementById(`img_${imageIndex}`).scrollIntoView({ inline: 'center', block: 'nearest' });
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
  let noImage;
  if (product.id === 66643) {
    noImage = 'https://i.kym-cdn.com/entries/icons/original/000/028/926/cove3.jpg';
  } else {
    noImage = 'https://acttochange.org/wp-content/plugins/ninja-forms/assets/img/no-image-available-icon-6.jpg';
  }
  return (
    <div className="overview-styles">
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
              style={{ backgroundImage: `url(${style.photos[0].thumbnail_url === null ? noImage : style.photos[0].thumbnail_url}` }}
            />
            {selectedStyle === style ? <i className="check-icon-visible fa fa-check-circle" /> : <div />}
          </div>
        ))}
      </div>

    </div>
  );
}

export default StyleSelector;
