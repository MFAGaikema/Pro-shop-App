import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { register } from '../actions/userActions'

import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'

const RegisterScreen = ({ location, history }) => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [message, setMessage] = useState(null)

	const redirect = location.search ? location.search.split('=')[1] : '/'

	const dispatch = useDispatch()

	const { user, loading, error } = useSelector((state) => state.userRegister)

	useEffect(() => {
		if (!(user === undefined || user === null)) {
			history.push(redirect)
		}
	}, [user, history, redirect])

	const submitHandler = (e) => {
		e.preventDefault()
    if(password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {

      dispatch(register(name, email, password))
    }
	}

	return (
		<FormContainer>
			<h3>Sign Up</h3>
      {error && <Message variant='danger'>{error}</Message>}
			{message && <Message variant='danger'>{message}</Message>}
			{loading && <Loader />}
			<Form onSubmit={submitHandler}>
				<Form.Group controlId='name'>
					<Form.Label>Name</Form.Label>
					<Form.Control
						type='name'
						placeholder='enter name'
						value={name}
						onChange={(e) => setName(e.target.value)}
					></Form.Control>
				</Form.Group>
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
        <Form.Group controlId='confirmPassword'>
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type='password'
          placeholder='confirm password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        ></Form.Control>
      </Form.Group>
				<Button type='submit' variant='light'>
					Register
				</Button>
			</Form>
      <Row className='py-3'>
      <Col>Have an account? <Link to={redirect ? `/login?redirect=${redirect}` : '/Login'}>Login</Link></Col>
    </Row>
		</FormContainer>
	)
}

export default RegisterScreen
