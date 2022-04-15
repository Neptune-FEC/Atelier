import React from 'react';
import { displayStarRating, displayFullStarRating } from './ProductHelper';

const DisplayStars = (props) => {
  const { rating } = props;

  // star logos html
  const fullStar = <i className="full-star fa-solid fa-star" />;
  const emptyStar = <i className="empty-star full-star fa-regular fa-star" />;
  const quarterStar = <i className="half-star fa-solid fa-star-half-stroke" />;
  const halfStar = <i className="half-star fa-solid fa-star-half-stroke" />;
  const thirdQuarterStar = <i className="half-star fa-solid fa-star-half-stroke" />;

  let stars = [];

  if (rating % 1 === 0) {
    stars = displayFullStarRating(
      rating,
      fullStar,
      emptyStar,
    );
  } else {
    stars = displayStarRating(
      rating,
      fullStar,
      emptyStar,
      quarterStar,
      halfStar,
      thirdQuarterStar,
    );
  }

  return stars;
};

export default DisplayStars;
