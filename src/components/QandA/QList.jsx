import React from 'react';
import Question from './Question';

class QList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { qList, numQs } = this.props;

    return (
      <div>
        <div>
          {qList.slice(0, numQs).map(((q) => (
            <Question
              question={q}
              key={q.question_id}
            />
          )
          ))}
        </div>
      </div>
    );
  }
}

export default QList;
