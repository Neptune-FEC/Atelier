import React from 'react';

class SearchQ extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQ: '',
    };
    this.onChangeSearchHandler = this.onChangeSearchHandler.bind(this);
  }

  onChangeSearchHandler(event) {
    const { searchQuestionCallback } = this.props;
    this.setState(
      { searchQ: event.target.value },
      () => searchQuestionCallback(event.target.value),
    );
  }

  render() {
    const { searchQ } = this.state;

    return (
      <div>
        <input
          className="searchBar"
          type="text"
          size="60"
          maxLength="60"
          placeholder="Have a question? Search for Answers..."
          value={searchQ}
          onChange={this.onChangeSearchHandler}
        />
      </div>
    );
  }
}

export default SearchQ;
