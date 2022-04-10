import React from 'react';

class SearchQ extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // const { SearchQ } = this.props;

    return (
      <div><div><input type="text" onChange={this.onChangeSearchHandler} /></div></div>
    );
  }
}

export default SearchQ;
