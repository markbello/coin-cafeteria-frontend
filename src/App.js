import React, { Component } from 'react';

import './App.css';
import './semantic/dist/semantic.min.css'

import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './components/Login'
import CoinsContainer from './containers/CoinsContainer'

class App extends Component {
  state = {
    loggedIn: false,
    username: "",
    password: ""
  }

  handleLogin = event => {
    let currentUser = event.target.children[1].children[1].children[0].value
    let currentPassword = event.target.children[2].children[1].children[0].value
    
    this.setState({
      loggedIn: !this.state.loggedIn,
      username: currentUser,
      password: currentPassword
    })
  }

  handleLogout = event => {
    this.setState({
      loggedIn: false
    })
  }

  render() {
    return (
      <Router>
        <Route exact path = "/" render={() => <CoinsContainer loggedIn={this.state.loggedIn} handleLogin={this.handleLogin} handleLogout={this.handleLogout} username={this.state.username} /> }  />
      </Router>
    );
  }
}

export default App;
