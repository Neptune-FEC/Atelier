import React from 'react';
import moment from 'moment';
import DisplayStars from '../../helpers/DisplayStars';

class ReviewTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandBodyClicked: false,
    };

    this.expandBody = this.expandBody.bind(this);
  }

  expandBody() {
    this.setState({
      expandBodyClicked: true,
    });
  }

  render() {
    const { expandBodyClicked } = this.state;
    const { review } = this.props;
    const {
      review_id, rating, summary, body, recommend,
      response, date, reviewer_name, helpfulness, photos
    } = review;
    const maxBodyLength = 250;

    return (
      <div id={`${review_id}-review-tile`} className="review-tile">
        <div className="review-tile-header">
          <div className="review-tile-stars">
            {/* <DisplayStars rating={rating} /> */}
            {`${rating} STARS`}
          </div>
          <div className="review-tile-user-and-date">
            {/* {verifiedUser ? <i className="fa-solid fa-circle-check"></i> : ''} */}
            {/* {verifiedUser ? '✅ ' : ''} */}
            {`${reviewer_name}, ${moment(date).format('LL')}`}
          </div>
        </div>
        <div className="review-tile-summary">
          {summary}
        </div>
        <div className="review-tile-body">
          {(expandBodyClicked || (body.length <= maxBodyLength)) ? body
            : `${body.substring(0, maxBodyLength - 1)}... `}
          {(expandBodyClicked || (body.length <= maxBodyLength)) ? '' : <span className="expand-body" onClick={this.expandBody} onKeyPress={() => {}} role="button" tabIndex="-1">Show More</span>}
        </div>
        <div className="review-tile-recommend">
          {recommend ? '✔ I recommend this product' : ''}
        </div>
        {response ? (
          <div className="review-tile-response">
            <h4>Response:</h4>
            <p>{response}</p>
          </div>
        ) : ''}
        <div className="review-tile-helpful">
          Helpful?
          <span className="uline">
            Yes (
            {helpfulness}
            )
          </span>
          |
          <span className="uline">Report</span>
        </div>
      </div>
    );
  }
}

export default ReviewTile;
