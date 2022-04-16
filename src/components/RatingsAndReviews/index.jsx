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
    return reviews.reduce((filteredReviews, currentReview) => filteredReviews.concat(
      filters[currentReview.rating] ? currentReview : [],
    ), []);
  }

  toggleNewReview(event) {
    const { showNewReview } = this.state;
    const { handleClick } = this.props;
    this.setState({
      showNewReview: !showNewReview,
    });

    if (event) {
      handleClick(event, 'RatingsAndReviews');
    }
  }

  addNewReview(params) {
    const { productId, reviewMeta, handleAddNewReview } = this.props;

    const postChars = {};

    Object.keys(reviewMeta.characteristics).forEach((charName) => {
      const characteristicId = reviewMeta.characteristics[charName].id.toString();
      postChars[characteristicId] = parseInt(params.characteristics[charName], 10);
    });

    const postParams = {
      product_id: productId,
      rating: parseInt(params.rating, 10),
      characteristics: postChars,
      summary: params.summary,
      body: params.body,
      recommend: params.recommend === 'true',
      name: params.reviewerName,
      email: params.email,
      photos: params.photos,
    };

    handleAddNewReview(postParams);

    this.toggleNewReview();
  }

  render() {
    const { filters, showNewReview } = this.state;
    const {
      reviewMeta, avgRating, reviews, numReviews, handleChangeReviewSort,
      reviewSort, getMoreReviews, noMoreReviews, numShownReviews, productName,
      handleClick,
    } = this.props;

    return (
      <div id="ratings-and-reviews">
        <div id="ratings-and-reviews-header">
          <h3>RATINGS & REVIEWS</h3>
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
                handleClick={handleClick}
                reviews={Object.keys(filters).length > 0
                  ? this.filterReviews() : reviews.slice(0, numShownReviews)}
              />
            </div>
          ) : (
            <div id="zero-ratings-and-reviews-container">
              This product currently has no reviews.
              <button className="" type="button" id="new-review-btn" onClick={(e) => { this.toggleNewReview(e); }}>Add A Review</button>
            </div>
          )}
        {showNewReview ? <NewReview productName={productName} toggleNewReview={this.toggleNewReview} availableChars={reviewMeta.characteristics} addNewReview={this.addNewReview} handleClick={handleClick} /> : ''}
      </div>
    );
  }
}

export default RatingsAndReviews;
