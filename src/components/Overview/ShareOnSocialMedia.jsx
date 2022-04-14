import React from 'react';

function ShareOnSocialMedia(props) {
  const { product } = props;
  return (
    <div
      className="share-on-social-media split"
    >
      <i className="fa fa-facebook-square share-icon" />
      <i
        className="fa fa-twitter-square share-icon"
        role="presentation"
        onClick={() => {
          window.open(`https://twitter.com/intent/tweet?text=${product.name}&url=${document.location.href}`, '_blank');
        }}
      />

      <i className="fa fa-pinterest-square share-icon" />
      <i className="fa fa-instagram share-icon" />
    </div>
  );
}
export default ShareOnSocialMedia;
