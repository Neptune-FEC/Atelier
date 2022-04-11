import React from 'react';
import moment from 'moment';
import DisplayStars from '../../helpers/DisplayStars';

function ReviewTile(props) {
  const { review } = props;
  const {
    review_id, rating, summary, body, recommend,
    response, date, reviewer_name, helpfulness, photos
  } = review;

  return (
    <div id={`${review_id}-review-tile`} className="review-tile">
      <div className="review-tile-header">
        <div className="review-tile-stars">
          <DisplayStars rating={rating} />
        </div>
        <div className="review-tile-user-and-date">
          {/* {verifiedUser ? <i className="fa-solid fa-circle-check"></i> : ''} */}
          {/* {verifiedUser ? '✅ ' : ''} */}
          {`${reviewer_name}, ${moment(date).format('LL')}`}
        </div>
      </div>
      <div className="review-tile-summary">
        {summary}
      </div>
      <div className="review-tile-body">
        {body}
      </div>
      <div className="review-tile-recommend">
        {recommend ? '✔ I recommend this product' : ''}
      </div>
      {response ? (
        <div className="review-tile-response">
          <h4>Response:</h4>
          <p>{response}</p>
        </div>
      ) : ''}
      <div className="review-tile-helpful">
        Helpful?
        <span className="uline">Yes ({helpfulness})</span>
        |
        <span className="uline">Report</span>
      </div>
    </div>
  );
}

export default ReviewTile;
