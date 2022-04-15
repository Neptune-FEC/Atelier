import React from 'react';
import { displayStarRating } from '../../helpers/ProductHelper';

function StarRatingProdCard(props) {
  const { starRating, numReviews } = props;
  const fullStar = <i className="full-star fa-solid fa-star" />;
  const emptyStar = <i className="empty-star full-star fa-regular fa-star" />;
  const quarterStar = <i className="half-star fa-solid fa-star-half-stroke" />;
  const halfStar = <i className="half-star fa-solid fa-star-half-stroke" />;
  const thirdQuarterStar = <i className="half-star fa-solid fa-star-half-stroke" />;
  const stars = displayStarRating(
    starRating,
    fullStar,
    emptyStar,
    quarterStar,
    halfStar,
    thirdQuarterStar,
  );
  return (
    numReviews
      ? (
        <div className="product-card-star-rating">
          <div className="product-card-stars">
            {stars}
          </div>
        </div>
      )
      : <div />
  );
}

export default StarRatingProdCard;
