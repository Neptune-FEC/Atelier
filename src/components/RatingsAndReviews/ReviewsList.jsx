import React from 'react';
import ReviewTile from './ReviewTile';

function ReviewsList(props) {
  return (
    <div id="review-list">
      <div className="review-list-header">
        248 Reviews, <label htmlFor="sort-reviews">sorted by:</label>
        <select id="sort-reviews">
          <option value="helpful">Helpful</option>
          <option value="relevant">Relevant</option>
          <option value="newest">Newest</option>
        </select>
      </div>
      <ReviewTile verifiedUser userRecommended sellerResponse />
      <ReviewTile />
      <div className="review-list-footer">
        <div className="review-options">
          <button className="" type="button">More Reviews</button>
          <button className="" type="button" id="new-review-btn">Add A Review</button>
        </div>
      </div>
    </div>
  );
}

export default ReviewsList;
