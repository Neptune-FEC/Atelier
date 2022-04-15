import React from 'react';
import moment from 'moment';
import DisplayStars from '../../helpers/DisplayStars';

const { markReviewHelpful, reportReview } = require('../../helpers/HttpClient');

class ReviewTile extends React.Component {
  constructor(props) {
    super(props);

    const { review } = this.props;

    this.state = {
      expandBodyClicked: false,
      helpfulness: review.helpfulness,
      markedHelpful: false,
      reported: false,
      // markedHelpful: localStorage[`${review.review_id}-helpful`],
      // reported: localStorage[`${review.review_id}-reported`],
    };

    this.expandBody = this.expandBody.bind(this);
    this.handleMarkHelpful = this.handleMarkHelpful.bind(this);
    this.handleReport = this.handleReport.bind(this);
  }

  handleMarkHelpful() {
    const { review } = this.props;
    const { helpfulness } = this.state;

    markReviewHelpful(review.review_id)
      .then((response) => {
        if (response.status === 204) {
          // localStorage[`${review.review_id}-helpful`] = true;

          this.setState({
            markedHelpful: true,
            helpfulness: helpfulness + 1,
          });
        }
      })
      .catch((err) => {
        console.warn('Error in marking helpful review :', err);
      });
  }

  handleReport() {
    const { review } = this.props;

    reportReview(review.review_id)
      .then((response) => {
        if (response.status === 204) {
          // localStorage[`${review.review_id}-reported`] = true;

          this.setState({
            reported: true,
          });

          // console.log(`${review.review_id} reported`);
        }
      })
      .catch((err) => {
        console.warn('Error in reporting review :', err);
      });
  }

  expandBody() {
    this.setState({
      expandBodyClicked: true,
    });
  }

  renderHelpful() {
    const { markedHelpful, helpfulness } = this.state;
    const helpfulHTML = [];

    if (markedHelpful) {
      helpfulHTML.push(
        <span>
          {`Yes (${helpfulness})`}
        </span>,
      );
    } else {
      helpfulHTML.push(
        <span className="uline" onClick={this.handleMarkHelpful} role="button" onKeyPress={() => {}} tabIndex="-1">
          {`Yes (${helpfulness})`}
        </span>,
      );
    }

    return helpfulHTML;
  }

  renderReport() {
    const { reported } = this.state;
    const reportHTML = [];

    if (reported) {
      reportHTML.push(
        <span>
          Report
        </span>,
      );
    } else {
      reportHTML.push(
        <span className="uline" onClick={this.handleReport} role="button" onKeyPress={() => {}} tabIndex="-1">
          Report
        </span>,
      );
    }

    return reportHTML;
  }

  render() {
    const { expandBodyClicked } = this.state;
    const { review } = this.props;
    const {
      review_id, rating, summary, body, recommend,
      response, date, reviewer_name, helpfulness, photos
    } = review;
    const maxBodyLength = 250;

    console.log(rating);

    return (
      <div id={`${review_id}-review-tile`} className="review-tile">
        <div className="review-tile-header">
          <div className="review-tile-stars">
            <DisplayStars rating={rating} />
            {/* {`${rating} STARS`} */}
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
          &nbsp;
          {this.renderHelpful(helpfulness)}
          &nbsp; &nbsp;|&nbsp; &nbsp;
          {this.renderReport()}
          {/* <span className="uline" onClick={this.handleReport} role="button" onKeyPress={() => {}} tabIndex="-1">
            Report
          </span> */}
        </div>
      </div>
    );
  }
}

export default ReviewTile;
