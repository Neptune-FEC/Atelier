import React from 'react';

function StarRating(props) {
  const { starRating, numReviews } = props;
  return (
    <div>
      <div>{starRating}</div>
      <div>total {numReviews} review</div>
    </div>
  );
}

export default StarRating;
