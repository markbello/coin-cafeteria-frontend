import React from 'react'
import {Header, Container, Search, Dropdown} from 'semantic-ui-react'

class NavBar extends React.Component {

  render() {
    let sortOptions = [ {text: 'Rank', value: 'Rank', name: 'Rank'},
                          {text: 'Alphabetical', value: 'Alphabetical'},
                          {text: 'Price', value: 'Price'},
                          {text: 'Percent Change', value: 'Percent Change'},

    ]

    return (
    <Container>
      <Header as='h1' color="red" textAlign="center" >
        <div onClick={this.props.goBackToAll}>Cypto Coins</div>
      </Header>
      <Dropdown placeholder='Sort By' fluid selection options={sortOptions} onChange={this.props.handleSort}/><br/>
      <Search onSearchChange={this.props.handleSearch} placeholder="Search" showNoResults={false} /><br/>
    </Container>
    )
  }
}

export default NavBar
