import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'

import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
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
  const { loading: loadingList, error: listError, orders } = useSelector((state) => state.myOrderList)

	useEffect(() => {
		if ((user === undefined || user === null)) {
			history.push('/')
		} else {
      if(!userDetails.name) {
        dispatch(getUserDetails('profile'))
				dispatch(listMyOrders())
      } else {
        setName(user.name)
        setEmail(user.email)
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
      <h4>User Profile</h4>
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
				{loadingList ? <Loader /> : 
					listError ? <Message variant=''>{listError}</Message> :
					<Table striped bordered hover responsive className='table-sm'>
						<thead>
						<tr>
							<th>
								ID
							</th>
							<th>
								DATE
							</th>
							<th>
								TOTAL
							</th>
							<th>
								PAID
							</th>
							<th>
								DELIVERED
							</th>
							<th></th>
							</tr>
						</thead>
						<tbody>
							{orders.map(order => 
								<tr key={order._id}>
								<td className="align-middle">{order._id}</td>
								<td className="align-middle">{order.createdAt.substring(0,10)}</td>
								<td className="align-middle">${order.totalPrice}</td>
								<td className="align-middle">{order.isPayed ? order.payedAt.substring(0,10) : <i className="fas fa-times" style={{color: 'red'}}> </i> }</td>
								<td className="align-middle">{order.isDelivered ? order.deliveredAt.substring(0,10) : <i className="fas fa-times" style={{color: 'red'}}> </i>}</td>
								<td>
									<LinkContainer to={`/orders/${order._id}`}>
										<Button variant='light'>Details</Button>
									</LinkContainer>
								</td>
								</tr>)}
						</tbody>
					</Table>
				}
      </Col>
    </Row>
	)
}

export default ProfileScreen