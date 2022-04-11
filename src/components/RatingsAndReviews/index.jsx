import React from 'react';
import RatingsBreakdown from './RatingsBreakdown';
import ReviewsList from './ReviewsList';

class RatingsAndReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: '',
      sort: '',
      reviews: []
    };
  }

  render() {
    const { filter, sort, reviews } = this.state;
    const { reviewMeta, avgRating } = this.props;

    console.log(reviewMeta);

    return (
      <div id="ratings-and-reviews">
        <div id="ratings-and-reviews-header">
          <h3>Ratings and Reviews</h3>
        </div>
        <div id="ratings-and-reviews-container">
          <RatingsBreakdown
            reviewMeta={reviewMeta}
            avgRating={avgRating}
            // recommended={recommended}
          />
          <ReviewsList />
        </div>
      </div>
    );
  }
}

export default RatingsAndReviews;
