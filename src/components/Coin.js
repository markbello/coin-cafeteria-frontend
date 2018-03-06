import React from 'react'
import {Card, Button} from 'semantic-ui-react'

const Coin = (props) => {
  const {name, symbol, price_usd, percent_change_24h} = props.coin

  let calculateChange = (number, percent) => {
    return (parseFloat(number) - (parseFloat(percent/100 )* parseFloat(number))).toFixed(5)
  }

  let image = <img src={props.logo} alt={symbol} className="logo" width="40px" height="40px" />
  return (
    <Card >
      <Card.Header as="h2">
        {name}
        <div>({symbol})</div>
        {image}
      </Card.Header>
      <Card.Content>
        Previous Value: <p style={{color:"grey"}}>${calculateChange(price_usd, percent_change_24h)}</p>
        Current Value: <p style={percent_change_24h > 0 ? {color:"green"} : {color:"red"}}>${parseFloat(price_usd).toFixed(5)}</p>
        24HR Percent Change: <p style={percent_change_24h > 0 ? {color:"green"} : {color:"red"}}>{percent_change_24h}%</p>
        <Button onClick={props.showCoinInfo} id={symbol}> Show More Info</Button>
        <Button onClick={() => props.addFavorite(symbol)} id={symbol}>Add to Favorites</Button>
        {props.favoriteCoins.includes(symbol) ? <Button onClick={() => props.removeFavorite(symbol)} id={symbol}>Remove from Favorites</Button> : null}
      </Card.Content>
    </Card>
  )
}

export default Coin
