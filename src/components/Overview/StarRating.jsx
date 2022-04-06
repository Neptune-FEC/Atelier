import React from 'react';

function StarRating(props) {
  const { starRating, numReviews } = props;
  const remainderStars = 5 - starRating;
  const remainder = remainderStars - Math.floor(remainderStars);
  const blackStars = [];
  const whiteStars = [];
  for (let i = 1; i < starRating; i += 1) {
    blackStars.push(<i className="black-star fa fa-star" />);
  }
  for (let i = 1; i < remainderStars; i += 1) {
    whiteStars.push(<i className="white-star fa fa-star" />);
  }
  if (remainder === 0.5) {
    whiteStars.push(<i className="black-star fa fa-star-half" />);
  }
  if (remainder === 0.25) {
    whiteStars.push(<i className="black-star fa fa-star-half" />);
  }
  return (
    <div className="overview-rating-reviews">
      <div className="overview-rating">
        {blackStars}
        {whiteStars}
      </div>
      <div href="reivews">
        Total
        {' '}
        {numReviews}
        {' '}
        review
      </div>
    </div>
  );
}

export default StarRating;
