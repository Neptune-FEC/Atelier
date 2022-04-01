import React from 'react';
import reactDOM from 'react-dom';
import './main.css'
import QnA from './components/QnA.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div>
        <h2>Hello Neptune!!!</h2>
        <QnA/>
      </div>
    )
  }

}

reactDOM.render(<App />, document.getElementById("root"));