import React from 'react';
import DisplayStars from '../../helpers/DisplayStars';

function getRecommendedPercentage(recommended) {
  if (Object.keys(recommended).length > 0) {
    const numFalse = recommended.false ? parseInt(recommended.false) : 0;
    const numTrue = recommended.true ? parseInt(recommended.true) : 0;
    const total = numFalse + numTrue;
    return Math.floor((numTrue / total) * 100);
  }

  return 0;
}

function displayRatings(ratings, props) {
  const { filters, addFilter, removeFilter } = props;
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
      <div className="rating-label">
        <label htmlFor={starId}>{`${star} Stars`}</label>
        <progress id={starId} max="100" value={percentage}  role="button" tabIndex="-1" onKeyPress={() => {}} onClick={
          filters[star] ? () => { removeFilter(star); } : () => { addFilter(star); }} />
        {/* {ratings[star]} */}
      </div>,
    );
  }

  return ratingsHTML;
}

function displayCharacteristics(characteristics) {
  const characteristicsHTML = [];

  Object.keys(characteristics).forEach((key) => {
    const characteristicId = `${key.toLowerCase()}-breakdown`;

    characteristicsHTML.push(
      <div>
        <div><label htmlFor={characteristicId}>{key}</label></div>
        <input type="range" id={characteristicId} name={key.toLowerCase()} min="0" max="5" value={characteristics[key].value} step=".1" disabled />
      </div>,
    );
  });

  return characteristicsHTML;
}

function displayFilters(props) {
  const { filters, removeFilter, removeAllFilters } = props;
  const filtersHTML = [];

  Object.keys(filters).forEach((rating) => {
    filtersHTML.push(
      <span className="rating-filter" onClick={() => { removeFilter(rating); }} onKeyPress={() => {}} role="button" tabIndex="-1">{`${rating} stars`}</span>,
    );
  });

  if (Object.keys(filters).length > 0) {
    filtersHTML.push(
      <span className="rating-filter" onClick={() => { removeAllFilters(); }} onKeyPress={() => {}} role="button" tabIndex="-1">remove all filters</span>,
    );
  }

  return filtersHTML;
}

function RatingsBreakdown(props) {
  const { avgRating, reviewMeta } = props;

  // console.log(reviewMeta);

  return (
    <div id="ratings-breakdown">
      <div className="filters">
        {displayFilters(props)}
      </div>
      <div className="product-rating">
        <span className="average-rating-number"><h1>{avgRating}</h1></span>
        <div className="average-rating-stars">
          <DisplayStars rating={avgRating} />
        </div>
      </div>
      <div className="recommendation-percentage">
        {reviewMeta ? getRecommendedPercentage(reviewMeta.recommended) : ''}
        % of reviews recommend this product
      </div>
      <div className="score-breakdown">
        {reviewMeta ? displayRatings(reviewMeta.ratings, props) : ''}
      </div>
      <div className="categories-breakdown">
        {reviewMeta ? displayCharacteristics(reviewMeta.characteristics) : ''}
      </div>
    </div>
  );
}

export default RatingsBreakdown;
