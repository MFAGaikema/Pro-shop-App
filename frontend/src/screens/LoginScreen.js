import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions'

import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'

const LoginScreen = ({location, history}) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

  const redirect = location.search ? location.search.split('=')[1] : '/'

	const dispatch = useDispatch()

  const {user, loading, error} = useSelector(state => state.userLogin)


  useEffect(() => {
    if(!(user === undefined || user === null)) {
      history.push(redirect)
      
    }
  }, [user, history, redirect])

	const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

	return (
		<FormContainer>
			<h3>Sign In</h3>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
			<Form onSubmit={submitHandler}>
				<Form.Group controlId='email'>
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type='email'
						placeholder='enter email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId='password'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='enter password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					></Form.Control>
				</Form.Group>
        <Button type='submit' variant='light'>Sign In</Button>
			</Form>
      <Row className='py-3'>
        <Col>New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link></Col>
      </Row>
		</FormContainer>
	)
}

export default LoginScreen
