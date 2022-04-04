import React from 'react';

function ImageGallery(props) {
  const { selectedStyle } = props;
  const { photos } = selectedStyle;
  console.log(selectedStyle);
  return (
    photos.map((photo) => <img key={photo.url} alt="url" src={photo.url} />)
  );
}

export default ImageGallery;
