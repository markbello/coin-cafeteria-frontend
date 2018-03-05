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
    password: "",
    checked: false
  }

  handleCheck = () => {
    this.setState({
      checked: !this.state.checked
    })
  }

  handleLogin = event => {
      fetch('http://localhost:3000/login', {
        method: "POST",
        headers: {"Content-Type": "application/json" },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password
        })
      }).then(res => res.json()).then(json => {
        if (json.token) {
          localStorage.setItem("token", json.token)
          this.setState({loggedIn: true})
        }
      })
  }

  handleLogout = event => {
    this.setState({
      loggedIn: false,
      checked: false
    })
  }

  handleUsernameInput = event => {
    this.setState({
      username: event.target.value
    })
  }

  handlePasswordInput = event => {
    this.setState({
      password: event.target.value
    })
  }

  createUser = () => {
    fetch('http://localhost:3000/users', {
      method: "POST",
      headers: {"Content-Type": "application/json" },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    }).then(res => res.json()).then(json => {
      console.log(json.token)
      if (json.token) {
        this.setState({loggedIn: true})
      } else {
        console.log("wtf")
      }
    })
  }

  render() {
    return (
      <Router>
        <Route exact path = "/" render={() => <CoinsContainer loggedIn={this.state.loggedIn}
                                                              handleLogin={this.handleLogin}
                                                              handleLogout={this.handleLogout}
                                                              handleCheck={this.handleCheck}
                                                              checked={this.state.checked}
                                                              username={this.state.username}
                                                              createUser={this.createUser}
                                                              handleUsernameInput={this.handleUsernameInput}
                                                              handlePasswordInput={this.handlePasswordInput} /> }  />
      </Router>
    );
  }
}

export default App;
