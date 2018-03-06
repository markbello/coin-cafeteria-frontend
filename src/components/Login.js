import React from 'react'
import {Header, Form, Input, Button, Checkbox} from 'semantic-ui-react'

class Login extends React.Component {

  render() {
    return(
      <Form  >
        <Header>Login Page</Header>
        <Form.Field>
          <label>Username</label>
          <Input type="text" placeholder="Username" onChange={this.props.handleUsernameInput}/>
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <Input type="password" placeholder="Password" onChange={this.props.handlePasswordInput}/>
        </Form.Field>
        <Form.Field>
          <Checkbox label='I agree to the Terms and Conditions' onChange={this.props.handleCheck} />
        </Form.Field>
        <Form.Field>
          <Button type='submit' onClick={this.props.handleLogin}>Submit</Button>
        </Form.Field>
        <Form.Field>
          <Button type='submit' onClick={this.props.createUser}>Create User</Button>
        </Form.Field>
      </Form>
    )
  }
}

export default Login
