import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Photo from './Photo';

class PhotoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { photoList } = this.props;

    return (
      <div>
        <div>
          {photoList.slice(0, 5).map(((photo) => (
            <Photo
              photo={photo}
              key={uuidv4()}
            />
          )
          ))}
        </div>
      </div>
    );
  }
}

export default PhotoList;
