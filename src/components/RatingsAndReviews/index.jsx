import React from 'react';
import RatingsBreakdown from './RatingsBreakdown';
import ReviewsList from './ReviewsList';
import NewReview from './NewReview';

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
    this.toggleNewReview = this.toggleNewReview.bind(this);
    this.addNewReview = this.addNewReview.bind(this);
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

  toggleNewReview() {
    const { showNewReview } = this.state;
    this.setState({
      showNewReview: !showNewReview,
    });
  }

  addNewReview(params) {
    const { productId, reviewMeta, handleAddNewReview } = this.props;

    const postChars = {};

    Object.keys(reviewMeta.characteristics).forEach((charName) => {
      const characteristicId = reviewMeta.characteristics[charName].id.toString();
      postChars[characteristicId] = parseInt(params.characteristics[charName], 10);
    });

    // console.log(postChars);

    const postParams = {
      product_id: productId,
      rating: parseInt(params.rating, 10),
      characteristics: postChars,
      summary: params.summary,
      body: params.body,
      recommend: params.recommend === 'true',
      name: params.reviewerName,
      email: params.email,
      photos: [],
    };

    handleAddNewReview(postParams);

    this.toggleNewReview();
  }

  render() {
    const { filters, showNewReview } = this.state;
    const {
      reviewMeta, avgRating, reviews, numReviews, handleChangeReviewSort,
      reviewSort, getMoreReviews, noMoreReviews, numShownReviews, productName,
    } = this.props;

    // console.log(reviewMeta);
    // console.log(reviews);
    console.log(`numReviews = ${numReviews}`);

    return (
      <div id="ratings-and-reviews">
        <div id="ratings-and-reviews-header">
          <h3>Ratings and Reviews</h3>
        </div>
        {numReviews > 0
          ? (
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
                toggleNewReview={this.toggleNewReview}
                reviews={Object.keys(filters).length > 0
                  ? this.filterReviews() : reviews.slice(0, numShownReviews)}
              />
            </div>
          ) : (
            <div id="zero-ratings-and-reviews-container">
              This product currently has no reviews.
              <button className="" type="button" id="new-review-btn" onClick={() => { this.toggleNewReview(); }}>Add A Review</button>
            </div>
          )}
        {showNewReview ? <NewReview productName={productName} toggleNewReview={this.toggleNewReview} availableChars={reviewMeta.characteristics} addNewReview={this.addNewReview} /> : ''}
      </div>
    );
  }
}

export default RatingsAndReviews;
