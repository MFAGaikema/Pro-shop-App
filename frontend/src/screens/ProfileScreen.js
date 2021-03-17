import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUserProfile } from '../actions/userActions'

import { Form, Button, Row, Col } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'

const ProfileScreen = ({ location, history }) => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [message, setMessage] = useState(null)

	const dispatch = useDispatch()

	const { userDetails, loading, error } = useSelector((state) => state.userDetails)
  const { user } = useSelector((state) => state.userLogin)
  const { success } = useSelector((state) => state.userUpdateProfile)

	useEffect(() => {
		if ((user === undefined || user === null)) {
			history.push('/')
		} else {
      console.log(userDetails)
      if(!userDetails.name) {
        dispatch(getUserDetails('profile'))
      } else {
        setName(userDetails.name)
        setEmail(userDetails.email)
      }
    }
	}, [user, history, userDetails, dispatch])

	const submitHandler = (e) => {
		e.preventDefault()
    if(password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(updateUserProfile({
        id: userDetails._id,
        name,
        email,
        password
      }))
    }
	}

	return (
    <Row>
      <Col md={3}>
      <h3>User Profile</h3>
      {success && <Message variant='success'>Profile successfully updated!</Message>}
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
					Update
				</Button>
			</Form>
      </Col>
      <Col md={9}>
        <h4>My orders</h4>
      </Col>
    </Row>
	)
}

export default ProfileScreen