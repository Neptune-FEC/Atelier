import React from 'react';
import Answer from './Answer';

class AnsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // answersList: [],
    };
  }

  render() {
    const { ansList, numAns, updateAnsStateHelper } = this.props;
    // console.log('ansList from props in AnsList component: ', ansList);

    return (
      <div>
        <div>
          {ansList.slice(0, numAns).map(((ans) => (
            <Answer
              answer={ans}
              key={ans.answer_id}
              updateAnsStateHelper={updateAnsStateHelper}
            />
          )
          ))}
        </div>
      </div>
    );
  }
}

export default AnsList;
