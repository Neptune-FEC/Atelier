import React from 'react';
import { displayStarRating } from '../../helpers/ProductHelper';

function StarRating(props) {
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
  // const remainderStars = 5 - starRating;
  // const remainder = remainderStars - Math.floor(remainderStars);
  // const blackStars = [];
  // const whiteStars = [];
  // for (let i = 1; i < starRating; i += 1) {
  //   blackStars.push(<i className="full-star fa fa-star" />);
  // }
  // for (let i = 1; i < remainderStars; i += 1) {
  //   whiteStars.push(<i className="empty-star fa fa-star" />);
  // }
  // if (remainder === 0.5) {
  //   whiteStars.push(<i className="half-star fa fa-star-half" />);
  // }
  // if (remainder === 0.25) {
  //   whiteStars.push(<i className="half-star fa fa-star-half" />);
  // }
  // if (remainder === 0.75) {
  //   whiteStars.push(<i className="half-star fa fa-star-half" />);
  // }
  return (
    numReviews
    && (
      <div className="overview-rating-reviews">
        <div className="overview-rating">
          {stars}
        </div>
        <a className="overview-reviews" href="#reviews">
          Read all
          {' '}
          {numReviews}
          {' '}
          reviews
        </a>
      </div>
    )
  );
}

export default StarRating;
