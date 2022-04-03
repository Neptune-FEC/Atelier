import React from 'react';
import Photo from './Photo';
import { v4 as uuidv4 } from 'uuid';


class PhotoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }



  render() {
    // console.log('ansList: ', this.props.ansList)
    // console.log('numQs in AnsList: ', this.props.numAns)

    return (
      <div>
        <div>{this.props.photoList.slice(0, 5).map((photo =>
          <Photo
            photo={photo}
            key={uuidv4()}
          />
        ))
        }</div>
      </div>
    );
  }
}

export default PhotoList;
