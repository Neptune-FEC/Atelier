import React from 'react';
import Question from './Question';


class QList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }



  render() {

    return (
      <div>
        <div>{this.props.qList.slice(0, this.props.numQs).map((q =>
          <Question
            question={q}
            key={q.question_id}
          />
        ))
        }</div>
      </div>
    );
  }
}

export default QList;
