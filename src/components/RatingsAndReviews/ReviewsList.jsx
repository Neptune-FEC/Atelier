import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import ReviewTile from './ReviewTile';

function handleShowMoreReviews(event, props) {
  const {
    getMoreReviews, handleClick,
  } = props;

  handleClick(event, 'RatingsAndReviews');
  getMoreReviews();
}

function ReviewsList(props) {
  const {
    reviews, numReviews, handleChangeReviewSort, noMoreReviews, toggleNewReview,
  } = props;
  const numWrittenReviews = reviews ? reviews.length : 0;

  return (
    <div id="review-list">
      <div className="review-list-header">
        {numReviews > 0 ? `${numReviews} reviews, ` : 'This product currently has no reviews.'}
        {numWrittenReviews > 0 ? (
          <span>
            <label htmlFor="sort-reviews">sorted by:</label>
            &nbsp;
            <select id="sort-reviews" defaultValue="relevant" onChange={(event) => { handleChangeReviewSort(event); }}>
              <option value="relevant">Relevant</option>
              <option value="helpful">Helpful</option>
              <option value="newest">Newest</option>
            </select>
          </span>
        ) : ''}
      </div>
      <div className="review-tiles">
        {reviews.map((review) => <ReviewTile review={review} key={uuidv4()} />)}
      </div>
      <div className="review-list-footer">
        <div className="review-options">
          {!noMoreReviews || (numReviews === 0) ? <button className="" type="button" onClick={(e) => { handleShowMoreReviews(e, props); }}>More Reviews</button> : ''}
          <button className="" type="button" id="new-review-btn" onClick={(e) => { toggleNewReview(e); }}>Add A Review</button>
        </div>
      </div>
    </div>
  );
}

export default ReviewsList;
