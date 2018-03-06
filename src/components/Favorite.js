import React, { Component } from 'react'
import { Form, Radio } from 'semantic-ui-react'

export default class Favorite extends Component {
  state = {}
  handleChange = (e, { value }) => this.setState({ value })

  render() {
    return (
      <Form>
        <Form.Field>
          Selected value: <b>{this.state.value}</b>
        </Form.Field>
        <Form.Field>
          <Radio
            label='All Coins'
            name='radioGroup'
            value='All Coins'
            checked={this.state.value === 'All Coins'}
            onChange={this.handleChange}
            onClick={this.props.handleFavorite}
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label='Favorites'
            name='radioGroup'
            value='Favorites'
            checked={this.state.value === 'Favorites'}
            onChange={this.handleChange}
            onClick={this.props.handleFavorite}
          />
        </Form.Field>
      </Form>
    )
  }
}
