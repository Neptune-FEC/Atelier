import React from 'react';

class NewReview extends React.Component {
  constructor(props) {
    super(props);

    const { availableChars } = props;

    let characteristics = {};

    Object.keys(availableChars).forEach((name) => {
      characteristics[name] = null;
    });

    console.log('NewReview constructor setup:');
    console.log(characteristics);

    this.state = {
      lastCharSelectMeaning: 'none selected',
      rating: 0,
      ratingMeaning: '',
      recommend: '',
      characteristics,
      summary: '',
      body: '',
      reviewerName: 'Example: jackson11!',
      email: 'Example: jackson11@email.com',
      submitError: '',
    };

    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.handleRecommendChange = this.handleRecommendChange.bind(this);
    this.handleCharacteristicChange = this.handleCharacteristicChange.bind(this);
    this.handleSummaryChange = this.handleSummaryChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.ratingMeanings = {
      1: 'Poor',
      2: 'Fair',
      3: 'Average',
      4: 'Good',
      5: 'Great',
    };

    this.characteristicsDictionary = {
      Size: {
        1: 'A size too small',
        2: '½ a size too small',
        3: 'Perfect',
        4: '½ a size too big',
        5: 'A size too wide',
      },
      Width: {
        1: 'Too narrow',
        2: 'Slightly narrow',
        3: 'Perfect',
        4: 'Slightly wide',
        5: 'Too wide',
      },
      Comfort: {
        1: 'Uncomfortable',
        2: 'Slightly uncomfortable',
        3: 'OK',
        4: 'Comfortable',
        5: 'Perfect',
      },
      Quality: {
        1: 'Poor',
        2: 'Below average',
        3: 'What I expected',
        4: 'Pretty great',
        5: 'Perfect',
      },
      Length: {
        1: 'Runs Short',
        2: 'Runs slightly short',
        3: 'Perfect',
        4: 'Runs slightly long',
        5: 'Runs long',
      },
      Fit: {
        1: 'Runs tight',
        2: 'Runs slightly tight',
        3: 'Perfect',
        4: 'Runs slightly long',
        5: 'Runs long',
      },
    };
  }

  handleRatingChange(event) {
    console.log(`Rating: ${event.target.value}`);
    this.setState({
      rating: event.target.value,
      ratingMeaning: this.ratingMeanings[event.target.value],
    });
  }

  handleRecommendChange(event) {
    console.log(`Recommend: ${event.target.value}`);
    this.setState({
      recommend: event.target.value,
    });
  }

  handleCharacteristicChange(characteristic, event) {
    console.log(`${characteristic}: ${event.target.value}`);
    const { characteristics } = this.state;
    characteristics[characteristic] = event.target.value;
    console.log(characteristics);
    this.setState({
      characteristics,
      lastCharSelectMeaning: this.characteristicsDictionary[characteristic][event.target.value],
    });
  }

  handleSummaryChange(event) {
    this.setState({
      summary: event.target.value,
    });
  }

  handleBodyChange(event) {
    this.setState({
      body: event.target.value,
    });
  }

  handleNameChange(event) {
    this.setState({
      reviewerName: event.target.value,
    });
  }

  handleEmailChange(event) {
    this.setState({
      email: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const {
      rating, recommend, characteristics, summary, body, reviewerName, email,
    } = this.state;

    const { addNewReview } = this.props;

    let errorMessage = '';

    //check mandatory inputs
    if (rating === 0) {
      errorMessage += 'Product rating is mandatory. ';
    }

    if (recommend === '') {
      errorMessage += 'Checking one of the product recommendation options (Yes/No) is mandatory. ';
    }

    const allCharacteristicsRated = Object.keys(characteristics).every(
      (charName) => characteristics[charName] !== null,
    );

    if (!allCharacteristicsRated) {
      errorMessage += 'All characteristics must be rated. ';
    }

    if (body.length < 50) {
      errorMessage += 'Review body cannot be less than 50 characters. ';
    }

    if (reviewerName === '') {
      errorMessage += 'Reviewer name cannot be empty. ';
    }

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (email === '') {
      errorMessage += 'Email cannot be empty. ';
    }

    if (!email.match(emailRegex)) {
      errorMessage += 'Email format is invalid. ';
    }

    let params = {};

    if (errorMessage.length > 0) {
      this.setState({
        submitError: errorMessage,
      });
    } else {
      this.setState({
        submitError: '',
      });

      params = {
        rating,
        recommend,
        characteristics,
        summary,
        body,
        reviewerName,
        email,
      };

      addNewReview(params);
    }

    // console.log('handleSubmit: ', params);
  }

  render() {
    const { productName, toggleNewReview } = this.props;
    const {
      lastCharSelectMeaning, rating, ratingMeaning, characteristics,
      summary, body, reviewerName, email, submitError,
    } = this.state;

    return (
      <div className="backgroundModal">
        <form action="" className="" onSubmit={this.handleSubmit}>
          <div className="new-review-container">
            <div className="modal-close-btn" onClick={() => { toggleNewReview(); }} role="button" onKeyPress={() => {}} tabIndex="-1">X</div>
            <div className="new-review-header">
              <p><h2>{`WRITE YOUR REVIEW ABOUT THE ${productName.toUpperCase()}`}</h2></p>
            </div>
            <div className="new-review-rating">
              <label htmlFor="product-rating">Overall Rating:&nbsp;</label>
              <select id="product-rating" value={rating} onChange={this.handleRatingChange}>
                <option value="0">&nbsp;</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
              &nbsp;
              {ratingMeaning}
            </div>
            <div className="new-review-recommend">
              Do you recommend this product?
              <input type="radio" name="recommend" value="true" id="yes-recommend" onChange={this.handleRecommendChange} />
              <label htmlFor="yes-recommend">Yes</label>
              <input type="radio" name="recommend" value="false" id="no-recommend" onChange={this.handleRecommendChange} />
              <label htmlFor="no-recommend">No</label>
            </div>
            <div className="new-review-characteristics">
              <table>
                <thead>
                  <tr>
                    <th colspan="6">Characteristics</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colspan="6">{lastCharSelectMeaning}</td>
                  </tr>
                  {/* {Object.keys(this.characteristicsDictionary).map((charName) => {
                    const tableRowHTML = [];
                    tableRowHTML.push(
                      <tr>
                        <td className="char-label">{charName}</td>
                        {Object.keys(this.characteristicsDictionary[charName]).map((charRating) => (<td><input type="radio" value={charRating} name={charName} onChange={(event) => { this.handleCharacteristicChange(charName, event); }} /></td>))}
                      </tr>,
                      <tr>
                        <td className="char-label">&nbsp;</td>
                        {Object.keys(this.characteristicsDictionary[charName]).map((charRating) => (
                          <td>{this.characteristicsDictionary[charName][charRating]}</td>
                        ))}
                      </tr>,
                    );
                    return tableRowHTML;
                  })} */}
                  {Object.keys(characteristics).map((charName) => {
                    const tableRowHTML = [];
                    tableRowHTML.push(
                      <tr>
                        <td className="char-label">{charName}</td>
                        {Object.keys(this.characteristicsDictionary[charName]).map((charRating) => (<td><input type="radio" value={charRating} name={charName} onChange={(event) => { this.handleCharacteristicChange(charName, event); }} /></td>))}
                      </tr>,
                      <tr>
                        <td className="char-label">&nbsp;</td>
                        {Object.keys(this.characteristicsDictionary[charName]).map((charRating) => (
                          <td>{this.characteristicsDictionary[charName][charRating]}</td>
                        ))}
                      </tr>,
                    );
                    return tableRowHTML;
                  })}
                </tbody>
              </table>
            </div>
            <div className="new-review-text-inputs">
              <div className="new-review-text-inputs-container">
                <div className="new-review-summary-label">Review Summary:</div>
                <div className="new-review-summary">
                  <input type="text" className="new-review-input" value={summary} onChange={this.handleSummaryChange} maxLength="60" />
                </div>
                <div className="new-review-body-label">
                  Review Body:
                </div>
                <div className="new-review-body">
                  <textarea className="new-review-textarea" value={body} onChange={this.handleBodyChange} />
                </div>
                <div className="new-review-nickname-label">
                  Nickname
                </div>
                <div className="new-review-nickname">
                  <input type="text" className="new-review-input" value={reviewerName} onChange={this.handleNameChange} maxLength="60" />
                  <span className="info-text">For privacy reasons, do not use your full name or email address</span>
                </div>
                <div className="new-review-email-label">
                  Email
                </div>
                <div className="new-review-email">
                  <input type="text" className="new-review-input" value={email} onChange={this.handleEmailChange} maxLength="60" />
                  <span className="info-text">For authentication reasons, you will not be emailed</span>
                </div>
                <div className="new-review-footer">
                  <div className="submit-error">{submitError}</div>
                  <button type="button">Upload Photo</button>
                  <button type="submit">Submit Review</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default NewReview;
