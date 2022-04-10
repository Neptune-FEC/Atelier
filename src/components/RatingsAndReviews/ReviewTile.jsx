import React from 'react';

function ReviewTile(props) {
  const { verifiedUser, userRecommended, sellerResponse } = props;

  return (
    <div className="review-tile">
      <div className="review-tile-header">
        <div className="review-tile-stars">
          <span className="fa-solid fa-star"></span>
          <span className="fa-solid fa-star"></span>
          <span className="fa-solid fa-star"></span>
          <span className="fa-regular fa-star"></span>
          <span className="fa-regular fa-star"></span>
        </div>
        <div className="review-tile-user-and-date">
          {verifiedUser ? <i className="fa-solid fa-circle-check"></i> : ''}
          reviewername, 2019-04-14T00:00:00.000Z
        </div>
      </div>
      <div className="review-tile-summary">
        I'm enjoying wearing these shades
      </div>
      <div className="review-tile-body">
        Comfortable and practical.
      </div>
      <div className="review-tile-recommend">
        {userRecommended ? <i className="fa-solid fa-check"></i> : ''}
        {userRecommended ? 'I recommend this product' : ''}
      </div>
      {sellerResponse ?
         <div className="review-tile-response">
          <h4>Response:</h4>
          <p>Glad you are enjoying the product!</p>
        </div>
        : ''}
      <div className="review-tile-helpful">
        Helpful?
        <span className="uline">Yes (8)</span>
        |
        <span className="uline">Report</span>
      </div>
    </div>
  );
}

export default ReviewTile;
