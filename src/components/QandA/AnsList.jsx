import React from 'react';
import Answer from './Answer';


class AnsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }



  render() {
    // console.log('ansList: ', this.props.ansList)
    // console.log('numQs in AnsList: ', this.props.numAns)

    return (
      <div>
        <div>{this.props.ansList.slice(0, this.props.numAns).map((ans =>
          <Answer
            answer={ans}
            key={ans.id}
          />
        ))
        }</div>
      </div>
    );
  }
}

export default AnsList;
