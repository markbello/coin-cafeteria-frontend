import React from 'react'
import {Card, Header,Container} from 'semantic-ui-react'

class NavBar extends React.Component {
  render() {
    return (
      <Header as='h1' color="red" textAlign="center" >
        <div onClick={this.props.goBackToAll}>Cypto Coins</div>
      </Header>
    )
  }
}

export default NavBar
