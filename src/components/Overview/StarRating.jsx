import React from 'react';
import { displayStarRating } from '../../helpers/ProductHelper';

function StarRating(props) {
  const { starRating, numReviews } = props;
  const fullStar = <i className="full-star fa fa-star" />;
  const emptyStar = <i className="empty-star full-star fa-regular fa-star" />;
  const quaterStar = <i className="half-star fa-solid fa-star-half-stroke" />;
  const halfStar = <i className="half-star fa-solid fa-star-half-stroke" />;
  const thirdQuaterStar = <i className="half-star fa-solid fa-star-half-stroke" />;
  const stars = displayStarRating(
    starRating,
    fullStar,
    emptyStar,
    quaterStar,
    halfStar,
    thirdQuaterStar,
  );

  return (
    numReviews
      ? (
        <div
          className="overview-rating-reviews"
        >
          <div className="overview-rating">
            {stars}
          </div>
          <a className="overview-reviews" href="#ratings-and-reviews">
            Read all
            {' '}
            {numReviews}
            {' '}
            reviews
          </a>
        </div>
      )
      : <div />
  );
}

export default StarRating;
