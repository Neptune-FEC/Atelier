import React from 'react';
import RatingsBreakdown from './RatingsBreakdown';
import ReviewsList from './ReviewsList';

class RatingsAndReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: '',
      sort: '',
      showNewReview: false,
    };
  }

  render() {
    const { filter, sort } = this.state;
    const {
      reviewMeta, avgRating, reviews, numReviews, handleChangeReviewSort,
      reviewSort, getMoreReviews, noMoreReviews, numShownReviews,
    } = this.props;

    // console.log(reviewMeta);
    // console.log(reviews);

    return (
      <div id="ratings-and-reviews">
        <div id="ratings-and-reviews-header">
          <h3>Ratings and Reviews</h3>
        </div>
        <div id="ratings-and-reviews-container">
          <RatingsBreakdown
            reviewMeta={reviewMeta}
            avgRating={avgRating}
          />
          <ReviewsList
            reviews={reviews.slice(0, numShownReviews)}
            numReviews={numReviews}
            reviewSort={reviewSort}
            handleChangeReviewSort={handleChangeReviewSort}
            getMoreReviews={getMoreReviews}
            noMoreReviews={noMoreReviews}
            numShownReviews={numShownReviews}
          />
        </div>
      </div>
    );
  }
}

export default RatingsAndReviews;
