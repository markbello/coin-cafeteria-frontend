import React from 'react'
import {Container, Header, Card} from 'semantic-ui-react'

const Coin = (props) => {
  const {name, rank, symbol, price_usd, percent_change_1h, percent_change_24h, percent_change_7d, market_cap_usd, available_supply, total_supply} = props.coin

  let image = <img src={props.logo} width="40px" height="40px" />
  return (
    <div>
      <Header as="h1" textAlign="center">
        {image} {name} ({symbol}) ${price_usd}
      </Header>

      <Card.Group itemsPerRow={4}>

        <Card>
          <Card.Header as="h2" textAlign="center">
            Rank
          </Card.Header>
          <Card.Content textAlign="center">
            {rank}
          </Card.Content>
        </Card>

        <Card>
          <Card.Header as="h2" textAlign="center">
            Percent Change(1hr)
          </Card.Header>
          <Card.Content textAlign="center">
            <p style={percent_change_1h > 0 ? {color:"green"} : {color:"red"}}>{percent_change_1h}</p>
          </Card.Content>
        </Card>

        <Card>
          <Card.Header as="h2" textAlign="center">
            Percent Change(24hr)
          </Card.Header>
          <Card.Content textAlign="center" >
            <p style={percent_change_24h > 0 ? {color:"green"} : {color:"red"}}>{percent_change_24h}</p>
          </Card.Content>
        </Card>

        <Card>
          <Card.Header as="h2" textAlign="center">
            Percent Change(7d)
          </Card.Header>
          <Card.Content textAlign="center">
            <p style={percent_change_7d > 0 ? {color:"green"} : {color:"red"}}>{percent_change_7d}</p>
          </Card.Content>
        </Card>

        <Card>
          <Card.Header as="h2" textAlign="center">
            Market Cap USD
          </Card.Header>
          <Card.Content textAlign="center">
            {market_cap_usd.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </Card.Content>
        </Card>

        <Card>
          <Card.Header as="h2" textAlign="center">
            24 Hr Volume
          </Card.Header>
          <Card.Content textAlign="center">
            {props.coin["24h_volume_usd"].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </Card.Content>
        </Card>

        <Card>
          <Card.Header as="h2" textAlign="center">
            Available Supply
          </Card.Header>
          <Card.Content textAlign="center">
            {available_supply.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </Card.Content>
        </Card>


        <Card>
          <Card.Header as="h2" textAlign="center">
            Total Supply
          </Card.Header>
          <Card.Content textAlign="center">
            {total_supply.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </Card.Content>
        </Card>

      </Card.Group>
    </div>
  )
}

export default Coin
