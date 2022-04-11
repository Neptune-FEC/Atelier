import React from 'react';
import { displayStarRating } from '../../helpers/ProductHelper';

// function getRecommendedPercentage(recommendObject) {
//   console.log(recommendObject);
//   const numFalse = parseInt(recommendObject.false);
//   const numTrue = parseInt(recommendObject.true);
//   const total = numFalse + numTrue;
//   return Math.floor((numTrue / total) * 100);
//   // return '100';
// }

function getRecommendedPercentage(recommended) {
  // const { reviewMeta } = props;
  // console.log(reviewMeta);
  // const { recommended } = reviewMeta;
  // console.log(recommended);
  // console.log(props.reviewMeta);
  const numFalse = parseInt(recommended.false);
  const numTrue = parseInt(recommended.true);
  const total = numFalse + numTrue;
  return (<span>{Math.floor((numTrue / total) * 100)}</span>);
  // return '100';
}

function displayRatings(ratings) {
  const minStar = 1;
  const maxStar = 5;
  let numRatings = 0;
  const ratingsHTML = [];

  Object.keys(ratings).forEach((rate) => {
    numRatings += parseInt(ratings[rate]);
  });

  for (let star = maxStar; star >= minStar; star -= 1) {
    const starId = `${star}-stars`;
    let percentage = 0;

    if (ratings && numRatings > 0) {
      if (ratings[star]) {
        percentage = Math.floor((parseInt(ratings[star]) / numRatings) * 100);
      }
    }

    ratingsHTML.push(
      <div>
        <label htmlFor={starId}>{star} Stars</label>
        <progress id={starId} max="100" value={percentage} />
      </div>
    );
  }

  return ratingsHTML;
}

function RatingsBreakdown(props) {
  const { avgRating, reviewMeta } = props;

  console.log(reviewMeta);

  // star logos html
  const fullStar = <i className="full-star fa fa-star" />;
  const emptyStar = <i className="empty-star full-star fa fa-star" />;
  const quaterStar = <i className="half-star fa fa-star-half" />;
  const halfStar = <i className="half-star fa fa-star-half" />;
  const thirdQuaterStar = <i className="half-star fa fa-star-half" />;

  const stars = displayStarRating(
    avgRating,
    fullStar,
    emptyStar,
    quaterStar,
    halfStar,
    thirdQuaterStar,
  );

  return (
    <div id="ratings-breakdown">
      <div className="product-rating">
        <span className="average-rating-number"><h1>{avgRating}</h1></span>
        <div className="average-rating-stars">
          {stars}
        </div>
      </div>
      <div className="recommendation-percentage">
        {/* {getRecommendedPercentage(reviewMeta)} */}
        {/* {getRecommendedPercentage(reviewMeta.recommended)} */}
        {reviewMeta ? getRecommendedPercentage(reviewMeta.recommended) : ''}
        % of reviews recommend this product
      </div>
      <div className="score-breakdown">
        {/* <div>
          <label htmlFor="5-stars">5 Stars</label>
          <progress id="5-stars" max="100" value="20"></progress>
        </div>
        <div>
          <label htmlFor="4-stars">4 Stars</label>
          <progress id="4-stars" max="100" value="70"></progress>
        </div>
        <div>
          <label htmlFor="3-stars">3 Stars</label>
          <progress id="3-stars" max="100" value="30"></progress>
        </div>
        <div>
          <label htmlFor="2-stars">2 Stars</label>
          <progress id="2-stars" max="100" value="25"></progress>
        </div>
        <div>
          <label htmlFor="1-stars">1 Stars</label>
          <progress id="1-stars" max="100" value="35"></progress>
        </div> */}
        {reviewMeta ? displayRatings(reviewMeta.ratings) : ''}
      </div>
      <div className="categories-breakdown">
        <div>
          <div><label htmlFor="size-breakdown">Size</label></div>
          <input type="range" id="size-breakdown" name="size" min="0" max="100" value="90" step="5" disabled />
        </div>
        <div>
          <div><label htmlFor="width-breakdown">Width</label></div>
          <input type="range" id="width-breakdown" name="width" min="0" max="100" value="10" step="5" disabled />
        </div>
        <div>
          <div><label htmlFor="comfort-breakdown">Comfort</label></div>
          <input type="range" id="comfort-breakdown" name="comfort" min="0" max="100" value="50" step="5" disabled />
        </div>
        <div>
          <div><label htmlFor="quality-breakdown">Quality</label></div>
          <input type="range" id="quality-breakdown" name="quality" min="0" max="100" value="80" step="5" disabled />
        </div>
        <div>
          <div><label htmlFor="length-breakdown">Length</label></div>
          <input type="range" id="length-breakdown" name="length" min="0" max="100" value="25" step="5" disabled />
        </div>
        <div>
          <div><label htmlFor="fit-breakdown">Fit</label></div>
          <input type="range" id="fit-breakdown" name="fit" min="0" max="100" value="65" step="5" disabled />
        </div>
      </div>
    </div>
  );
}

export default RatingsBreakdown;
