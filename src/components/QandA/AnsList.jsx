import React from 'react';
import Answer from './Answer';

class AnsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      ansList, numAns, updateAnsStateHelper, showingMoreAnswers,
    } = this.props;
    // console.log('ansList from props in AnsList: ', ansList.length);

    return (
      <div>
        {ansList.length === 0 ? (<div className="emptyAnsList">(No answers yet)</div>)
          : (
            <div className="ansList">
              {
              showingMoreAnswers
                ? (
                  <div className="ansListExpanded">
                    {ansList.map(((ans) => (
                      <Answer
                        answer={ans}
                        key={ans.answer_id}
                        updateAnsStateHelper={updateAnsStateHelper}
                      />
                    )
                    ))}
                  </div>
                ) : (
                  <div className="ansListDefault">
                    {ansList.slice(0, numAns).map(((ans) => (
                      <Answer
                        answer={ans}
                        key={ans.answer_id}
                        updateAnsStateHelper={updateAnsStateHelper}
                      />
                    )
                    ))}
                  </div>
                )
            }
            </div>
          )}
      </div>
    );
  }
}

export default AnsList;
