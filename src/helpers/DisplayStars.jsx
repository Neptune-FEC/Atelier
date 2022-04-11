import React from 'react';
import { displayStarRating } from './ProductHelper';

const DisplayStars = (props) => {
  const { rating } = props;

  // star logos html
  const fullStar = <i className="full-star fa fa-star" />;
  const emptyStar = <i className="empty-star full-star fa fa-star" />;
  const quaterStar = <i className="half-star fa fa-star-half" />;
  const halfStar = <i className="half-star fa fa-star-half" />;
  const thirdQuaterStar = <i className="half-star fa fa-star-half" />;

  return displayStarRating(
    rating,
    fullStar,
    emptyStar,
    quaterStar,
    halfStar,
    thirdQuaterStar,
  );
};

export default DisplayStars;
