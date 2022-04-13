import React from 'react';
import AnsFooter from './AnsFooter';
import PhotoList from './PhotoList';

class Answer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { answer, updateAnsStateHelper } = this.props;
    // console.log('answer: ', answer);

    return (
      <div className="ans">
        <div>{answer.body}</div>
        <AnsFooter
          answer={answer}
          updateAnsStateHelper={updateAnsStateHelper}
        />
        <div />
        <PhotoList photoList={answer.photos} />
      </div>
    );
  }
}

export default Answer;
