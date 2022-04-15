import React from 'react';
import ReviewTile from './ReviewTile';

function ReviewsList(props) {
  const { reviews, numReviews, handleChangeReviewSort,
    reviewSort, getMoreReviews, noMoreReviews, numShownReviews, toggleNewReview } = props;
  const numWrittenReviews = reviews ? reviews.length : 0;

  // console.log(`shown reviews: ${numShownReviews} , reviews length: ${reviews.length}`);

  return (
    <div id="review-list">
      <div className="review-list-header">
        {numReviews > 0 ? `${numReviews} reviews, ` : 'This product currently has no reviews.'}
        {numWrittenReviews > 0 ? (
          <span>
            <label htmlFor="sort-reviews">sorted by:</label>
            <select id="sort-reviews" onChange={(event) => { handleChangeReviewSort(event.target.value); }}>
              <option value="relevant" selected={reviewSort === 'relevant'}>Relevant</option>
              <option value="helpful" selected={reviewSort === 'helpful'}>Helpful</option>
              <option value="newest" selected={reviewSort === 'newest'}>Newest</option>
            </select>
          </span>
        ) : ''}
      </div>
      {reviews.map((review) => <ReviewTile review={review} />)}
      <div className="review-list-footer">
        <div className="review-options">
          {!noMoreReviews || (numReviews === 0) ? <button className="" type="button" onClick={() => { getMoreReviews(); }}>More Reviews</button> : ''}
          <button className="" type="button" id="new-review-btn" onClick={() => { toggleNewReview(); }}>Add A Review</button>
        </div>
      </div>
    </div>
  );
}

export default ReviewsList;
