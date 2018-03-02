import React from 'react'
import Coin from '../components/Coin'
import CoinInfo from '../components/CoinInfo'
import NavBar from '../components/NavBar'
// import Search from '../components/Search'
import {Card, Header,Container, Search} from 'semantic-ui-react'

class CoinsContainer extends React.Component {
  state = {
    coins: [],
    newsInfo: "",
    showAll: true,
    currentCoin: {},
    searchTerm: ""
  }

  componentDidMount() {
    fetch('https://api.coinmarketcap.com/v1/ticker/')
    .then(res => res.json())
    .then(json => this.setState({coins: json}))
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
      searchTerm: event.target.value
    })
  }

  goBackToAll = event => {
    this.setState({
      showAll: true
    })
  }


  render() {
    let searchedCoins = this.state.coins.filter(coin => {return coin.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())})

    let coins = searchedCoins.map(coin => {
      let logo = require(`../icon/${coin.symbol.toLowerCase()}.png`)
      return <Coin key= {coin.id} coin={coin} logo={logo} showCoinInfo={this.showCoinInfo} />
    })
    return (
      <div >
        <NavBar goBackToAll={this.goBackToAll}/>
        {this.state.showAll ?
        <Container textAlign="center" >
          <Search onSearchChange={this.handleSearch} showNoResults={false} /><br/>
          <Card.Group itemsPerRow={4} textAlign="center">
            {coins}
          </Card.Group>
        </Container>
        :
        <CoinInfo coin={this.state.currentCoin} logo={require(`../icon/${this.state.currentCoin.symbol.toLowerCase()}.png`)} />
      }
      </div>

    )
  }
}

export default CoinsContainer
