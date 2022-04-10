import React from 'react';
import RatingsBreakdown from './RatingsBreakdown';
import ReviewsList from './ReviewsList';

class RatingsAndReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: '',
      sort: '',
      reviews: [],
    };
  }

  render() {
    const { filter, sort, reviews } = this.state;

    return (
      <div id="ratings-and-reviews">
        <div id="ratings-and-reviews-header">
          <h3>Ratings and Reviews</h3>
        </div>
        <div id="ratings-and-reviews-container">
          <RatingsBreakdown />
          <ReviewsList />
        </div>
      </div>
    );
  }
}

export default RatingsAndReviews;
