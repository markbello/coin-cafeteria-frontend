import React from 'react'
import Coin from '../components/Coin'
import {Card, Header,Container} from 'semantic-ui-react'

class CoinsContainer extends React.Component {
  state = {
    coins: [],
    newsInfo: ""
  }

  componentDidMount() {
    fetch('https://api.coinmarketcap.com/v1/ticker/')
    .then(res => res.json())
    .then(json => this.setState({coins: json}))
  }


  render() {
    let coins = this.state.coins.map(coin => {
      let logo = require(`../icon/${coin.symbol.toLowerCase()}.png`)
      return <Coin key= {coin.id} coin={coin} logo={logo} />
    })
    return (
      <div>
        <Header as='h1' color="red" textAlign="center" >
          Cypto Coins
        </Header>
        <Container textAlign="center" >
          <Card.Group itemsPerRow={4} textAlign="center">
            {coins}
          </Card.Group>
        </Container>
      </div>

    )
  }
}

export default CoinsContainer
