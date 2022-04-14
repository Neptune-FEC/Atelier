import React from 'react';
import RatingsBreakdown from './RatingsBreakdown';
import ReviewsList from './ReviewsList';

class RatingsAndReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: {},
      showNewReview: false,
    };

    this.addFilter = this.addFilter.bind(this);
    this.removeFilter = this.removeFilter.bind(this);
    this.removeAllFilters = this.removeAllFilters.bind(this);
  }

  addFilter(rating) {
    const { filters } = this.state;
    filters[rating] = true;
    this.setState({
      filters,
    });
  }

  removeFilter(rating) {
    const { filters } = this.state;
    delete filters[rating];
    this.setState({
      filters,
    });
  }

  removeAllFilters() {
    this.setState({
      filters: {},
    });
  }

  filterReviews() {
    const { filters } = this.state;
    const { reviews } = this.props;
    return reviews.reduce((filteredReviews, currentReview) => {
      return filteredReviews.concat(filters[currentReview.rating] ? currentReview : [])
    }, []);
  }

  render() {
    const { filters } = this.state;
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
            addFilter={this.addFilter}
            removeFilter={this.removeFilter}
            removeAllFilters={this.removeAllFilters}
            filters={filters}
          />
          <ReviewsList
            numReviews={numReviews}
            reviewSort={reviewSort}
            handleChangeReviewSort={handleChangeReviewSort}
            getMoreReviews={getMoreReviews}
            noMoreReviews={Object.keys(filters).length > 0 ? true : noMoreReviews}
            numShownReviews={numShownReviews}
            reviews={Object.keys(filters).length > 0
              ? this.filterReviews() : reviews.slice(0, numShownReviews)}
          />
        </div>
      </div>
    );
  }
}

export default RatingsAndReviews;
