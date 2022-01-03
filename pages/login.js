import { Button, Form, Icon, Message, Segment } from 'semantic-ui-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import catchErrors from '../utils/catchErrors'
import baseUrl from '../utils/baseUrl'
import axios from 'axios'
import { handleLogin } from '../utils/auth'

const INITIAL_USER = {
  email: '',
  password: ''
}

function Signup() {
  const [user, setUser] = useState(INITIAL_USER)
  const [disabled, setDisabled] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const isUser = Object.values(user).every(el => Boolean(el))
    isUser ? setDisabled(false) : setDisabled(true)
  }, [user])

  const handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    setUser(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      setError('')
      const url = `${baseUrl}/api/login`
      const payload = { ...user }
      const response = await axios.post(url, payload)
      handleLogin(response.data)
      //console.log(user)
    } catch (error) {
      catchErrors(error, setError)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Message 
        attached
        icon="settings"
        header="Welcome Back!"
        content="Login with email and password"
        color="blue"
      />
      <Form 
        onSubmit={handleSubmit}
        loading={loading}
        error={Boolean(error)}
      >
        <Message 
          error
          header="Oops!"
          content={error}
        />
        <Segment>
          
          <Form.Input
            fluid
            icon="envelope"
            iconPosition="left"
            label="Email"
            placeholder="Email"
            name="email"
            type="email"
            value={user.email}
            onChange={handleChange}
          />
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            label="Password"
            placeholder="Password"
            name="password"
            value={user.password}
            type="password"
            onChange={handleChange}
          />
          <Button 
            icon="signup"
            type="submit"
            color="orange"
            content="Sign Up"
            disabled={disabled || loading}
          />
        </Segment>
      </Form>
      <Message
        attached="bottom" warning
      >
        <Icon name="help"/>
        New user?{' '}
        <Link href="/signup">
          <a>Sign up here</a>
        </Link>{' '}instead.
      </Message>
    </>
  );
}

export default Signup;
