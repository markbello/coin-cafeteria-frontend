import React, { Component } from 'react';

import './App.css';
import './semantic/dist/semantic.min.css'

import {Route, Switch, withRouter } from 'react-router-dom'
import CoinsContainer from './containers/CoinsContainer'
import Login from './components/Login'

class App extends Component {
  state = {
    loggedIn: false,
    username: "",
    password: "",
    userId: "",
    checked: false,
    favoriteCoins: []
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
      if (json.error) {
        alert(json.error)
      } else {
        localStorage.setItem("token", json.token)
        let newCoins = json.coins.map(coin => coin.symbol)
        this.setState({
          loggedIn: true,
          userId: json.user.id,
          username: json.user.username,
          favoriteCoins: newCoins
        }, ()=>this.props.history.push("/"))
      }
    })
  }

  componentDidMount() {
    if (localStorage.getItem("token")) {
      fetch(`http://localhost:3000/current_user`, {
        method: "POST",
        headers: {"Authorization": localStorage.getItem("token")}
      }).then(res=>res.json()).then(json => {
        debugger
        let newCoins = json.coins.map(coin => coin.symbol)
        this.setState({
          loggedIn: true,
          userId: json.id,
          username: json.username,
          favoriteCoins: newCoins,
          checked: true
        },()=>this.props.history.push("/"))
      })
    }
  }

  addFavorite = (symbol) => {
    fetch(`http://localhost:3000/users/${this.state.userId}`, {
      method: "POST",
      headers: {"Content-Type": "application/json" },
      body: JSON.stringify({
        coins: symbol
      })
    }).then(res=>res.json()).then(json => {
      let newCoins = json.coins.map(coin => coin.symbol)
      this.setState({
        favoriteCoins: newCoins
      })
    })
  }

  removeFavorite = (symbol) => {
    fetch(`http://localhost:3000/users/${this.state.userId}`, {
      method: "DELETE",
      headers: {"Content-Type": "application/json" },
      body: JSON.stringify({
        coins: symbol
      })
    }).then(res=>res.json()).then(json => {
      let newCoins = json.coins.map(coin => coin.symbol)
      this.setState({
        favoriteCoins: newCoins
      })
    })
  }

  handleLogout = event => {
    localStorage.removeItem("token")
    this.setState({
      loggedIn: false,
      checked: false,
      username: "",
      password: "",
      userId: "",
      favoriteCoins: []
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
      localStorage.setItem("token", json.token)
      if (json.token) {
        this.setState({loggedIn: true}, ()=>this.props.history.push("/"))
      } else {
        alert(json.error)
      }
    })
  }

  render() {
    return (
        <Switch>
          <Route exact path = "/" render={(routerProps) => <CoinsContainer loggedIn={this.state.loggedIn}
                                                                handleLogout={this.handleLogout}
                                                                {...routerProps}
                                                                checked={this.state.checked}
                                                                username={this.state.username}
                                                                addFavorite={this.addFavorite}
                                                                removeFavorite={this.removeFavorite}
                                                                favoriteCoins={this.state.favoriteCoins} /> }  />

          <Route exact path = "/login" render={(routerProps) =>  <Login handleLogin={this.handleLogin}
                                                              handleCheck={this.handleCheck}
                                                              createUser={this.createUser}
                                                              {...routerProps}
                                                              handleUsernameInput={this.handleUsernameInput}
                                                              handlePasswordInput={this.handlePasswordInput}/> } />
        </Switch>
    );
  }
}

export default withRouter(App);
