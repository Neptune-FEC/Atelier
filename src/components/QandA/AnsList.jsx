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
    const { ansList, numAns, callbackRenderAnsList } = this.props;
    // console.log('ansList from props in AnsList component: ', ansList);

    return (
      <div>
        <div>
          {ansList.slice(0, numAns).map(((ans) => (
            <Answer
              answer={ans}
              key={ans.answer_id}
              callbackRenderAnsList={callbackRenderAnsList}
            />
          )
          ))}

        </div>
      </div>
    );
  }
}

export default AnsList;
