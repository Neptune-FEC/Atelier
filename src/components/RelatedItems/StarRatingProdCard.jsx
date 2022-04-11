import React from 'react';
import { displayStarRating } from '../../helpers/ProductHelper';

function StarRatingProdCard(props) {
  const { starRating, numReviews } = props;
  const fullStar = <i className="full-star fa fa-star" />;
  const emptyStar = <i className="empty-star full-star fa fa-star" />;
  const quaterStar = <i className="half-star fa fa-star-half" />;
  const halfStar = <i className="half-star fa fa-star-half" />;
  const thirdQuaterStar = <i className="half-star fa fa-star-half" />;
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
