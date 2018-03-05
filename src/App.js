import React, { Component } from 'react';

import './App.css';
import './semantic/dist/semantic.min.css'

import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './components/Login'
import CoinsContainer from './containers/CoinsContainer'

class App extends Component {
  state = {
    loggedIn: false
  }

  handleLogin = event => {
    // let username = event.target.parentElement.children[0].children[0].value
    // let password = event.target.parentElement.children[1].children[0].value
    this.setState({
      loggedIn: !this.state.loggedIn
    })
  }

  render() {
    return (
      <Router>
        <Route exact path = "/" render={() => <CoinsContainer loggedIn={this.state.loggedIn} handleLogin={this.handleLogin} /> }  />
      </Router>
    );
  }
}

export default App;
