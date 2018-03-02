import React from 'react'
import {Card, Grid, Button} from 'semantic-ui-react'

const Coin = (props) => {
  const {name, symbol, price_usd, percent_change_24h} = props.coin

  let calculateChange = (number, percent) => {
    return (parseFloat(number) - (parseFloat(percent/100 )* parseFloat(number))).toFixed(3)
  }

  let image = <img src={props.logo} width="40px" height="40px" />
  return (
    <Card >
      <Card.Header as="h2">
        {name}
        <div>({symbol})</div>
        <div className="logo">{image}</div>
      </Card.Header>
        Previous Value: <p style={{color:"grey"}}>${calculateChange(price_usd, percent_change_24h)}</p>
        Current Value: <p style={percent_change_24h > 0 ? {color:"green"} : {color:"red"}}>${parseFloat(price_usd).toFixed(3)}</p>
        24HR Percent Change: <p style={percent_change_24h > 0 ? {color:"green"} : {color:"red"}}>{percent_change_24h}%</p>
        <Button onClick={props.showCoinInfo} id={symbol}> Show More Info</Button>
    </Card>
  )
}

export default Coin
