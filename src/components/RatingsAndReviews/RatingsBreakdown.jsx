import React from 'react';

function RatingsBreakdown(props) {
  return (
    <div id="ratings-breakdown">
      <div className="product-rating">
        <span className="average-rating-number"><h1>3.5</h1></span>
        <div className="average-rating-stars">
          <span className="fa-solid fa-star"></span>
          <span className="fa-solid fa-star"></span>
          <span className="fa-solid fa-star"></span>
          <span className="fa-regular fa-star-half-stroke"></span>
          <span className="fa-regular fa-star"></span>
        </div>
      </div>
      <div className="recommendation-percentage">
        100% of reviews recommend this product
      </div>
      <div className="score-breakdown">
        <div>
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
        </div>
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
