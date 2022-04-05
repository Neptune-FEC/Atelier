import React from 'react';
import Answer from './Answer';

class AnsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { ansList, numAns } = this.props;

    return (
      <div>
        <div>
          {ansList.slice(0, numAns).map(((ans) => (
            <Answer
              answer={ans}
              key={ans.id}
            />
          )
          ))}

        </div>
      </div>
    );
  }
}

export default AnsList;
