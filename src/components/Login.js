import React from 'react'
import {Header, Container, Form, Input, Button, Checkbox} from 'semantic-ui-react'

class Login extends React.Component {

  render() {
    console.log(this.props.handleLogin)
    return(
      <Form onSubmit={this.props.handleLogin} >
        <Header>Login Page</Header>
        <Form.Field>
          <label>Username</label>
          <Input type="text" placeholder="Username"/>
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <Input type="password" placeholder="Password"/>
        </Form.Field>
        <Form.Field>
          <Checkbox label='I agree to the Terms and Conditions' />
        </Form.Field>
        <Button type='submit'>Submit</Button>
      </Form>
    )
  }
}

export default Login
