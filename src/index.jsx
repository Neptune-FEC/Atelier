import React from 'react';
import reactDOM from 'react-dom';
import './main.css';
// import QnA from './components/QandA/QnA';
import ProductDetailPage from './components/ProductDetailPage';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ProductDetailPage />
    );
  }
}

reactDOM.render(<App />, document.getElementById('root'));
