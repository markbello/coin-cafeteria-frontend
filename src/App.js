import React, { Component } from 'react';
import './App.css';
import './semantic/dist/semantic.min.css'


import CoinsContainer from './containers/CoinsContainer'

class App extends Component {

  render() {
    return (
      <div>
        <CoinsContainer />
      </div>
    );
  }
}

export default App;
