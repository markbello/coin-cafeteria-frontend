import React from 'react'
import Coin from '../components/Coin'
import CoinInfo from '../components/CoinInfo'
import NavBar from '../components/NavBar'
import {Card, Container} from 'semantic-ui-react'
import { Redirect } from 'react-router'


class CoinsContainer extends React.Component {
  state = {
    coins: [],
    newsInfo: "",
    showAll: true,
    currentCoin: {},
    searchTerm: "",
    sortBy: "",
    showFavorite: false
  }

  componentDidMount() {
    // fetch('https://api.coinmarketcap.com/v1/ticker/')
    fetch('https://coin-cafeteria-api.herokuapp.com/coins/')
    .then(res => res.json())
    .then(json => {
      this.setState({coins: json})
    })
  }

  showCoinInfo = event => {
    this.setState({
      showAll: !this.state.showAll,
      currentCoin: this.findCoin(event.target.id)
    })
  }

  findCoin = symbol => {
    return this.state.coins.find(coin => {
      return coin.symbol === symbol
    })
  }

  handleSearch = event => {
    this.setState({
      searchTerm: event.target.value,
      showAll: true
    })
  }

  goBackToAll = event => {
    this.setState({
      showAll: true
    })
  }

  handleSort = event => {
    this.setState({
      sortBy: event.target.children[0].innerText,
      showAll: true
    })
  }

  sortRank = (coins) => {
    return coins.sort(function(a,b) {
      return a.rank - b.rank
    })
  }

  sortAlphabetical = (coins) => {
    return coins.sort(function(a,b) {
      return a.name.localeCompare(b.name)
    })
  }

  sortPrice = (coins) => {
    return coins.sort(function(a,b) {
      return b.price_usd - a.price_usd
    })
  }

  sortPercentChange = (coins) => {
    return coins.sort(function(a,b) {
      return b.percent_change_24h - a.percent_change_24h
    })
  }

  chooseSort = (coins) => {
    switch(this.state.sortBy) {
      case("Rank"): return this.sortRank(coins)
      case("Alphabetical"): return this.sortAlphabetical(coins)
      case("Price"): return this.sortPrice(coins)
      case("Percent Change"): return this.sortPercentChange(coins)
      default: return this.sortRank(coins)
    }
  }

  handleFavorite = event => {
    if (event.target.innerText === "All Coins"){
      this.setState({
        showFavorite: false
      })
    } else {
      this.setState({
        showFavorite: true
      })
    }
  }

  displayFavorites = coins => {
    return coins.filter(coin => {return this.props.favoriteCoins.includes(coin.symbol)})
  }


  render() {
    let favorites = this.state.showFavorite ? this.displayFavorites([...this.state.coins]) : [...this.state.coins]

    let sortedCoins = this.chooseSort(favorites)
    let searchedCoins = sortedCoins.filter(coin => {return coin.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())})

    let coins = searchedCoins.map(coin => {
      let logo = require(`../icon/${coin.symbol.toLowerCase()}.png`)
      return <Coin key= {coin.id} coin={coin} logo={logo} showCoinInfo={this.showCoinInfo} addFavorite={this.props.addFavorite} removeFavorite={this.props.removeFavorite} favoriteCoins={this.props.favoriteCoins} />
    })
    return this.props.loggedIn && this.props.checked ?
     (
      <Container textAlign="center" >
        <NavBar handleFavorite={this.handleFavorite} username={this.props.username} goBackToAll={this.goBackToAll} showAll={this.state.showAll} handleSearch={this.handleSearch} handleSort={this.handleSort} handleLogout={this.props.handleLogout}/>
        {this.state.showAll ?
        <Container textAlign="center" >
          <Card.Group itemsPerRow={4} textAlign="center">
            {coins}
          </Card.Group>
        </Container>
        :
        <CoinInfo coin={this.state.currentCoin} logo={require(`../icon/${this.state.currentCoin.symbol.toLowerCase()}.png`)} />
      }
    </Container>
    )
    :
    <Redirect to="/login" />
  }
}

export default CoinsContainer
