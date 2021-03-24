import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'

import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'

const UserEditScreen = ({ match, history }) => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [isAdmin, setIsAdmin] = useState(false)

	const userId = match.params.id

	const dispatch = useDispatch()

	const { userDetails, loading, error } = useSelector((state) => state.userDetails)

	const { loading: loadingUpdate, error: errorUpdate, success } = useSelector((state) => state.userUpdate)

	useEffect(() => {
		if (success) {
			dispatch({ type: USER_UPDATE_RESET })
			history.push('/admin/userlist')
		} else {
			if (!userDetails.name || userDetails._id !== userId) {
				dispatch(getUserDetails(userId))
			} else {
				setName(userDetails.name)
				setEmail(userDetails.email)
				setIsAdmin(userDetails.isAdmin)
			}
		}
	}, [userDetails, dispatch, userId, history, success])

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(
			updateUser({
				_id: userId,
				name,
				email,
				isAdmin,
			})
		)
	}

	return (
		<>
			<Link to='/admin/userlist' className='btn btn-light my-3'>
				Go Back
			</Link>
			<FormContainer>
				<h3>Edit User</h3>
				{loadingUpdate && <Loader />}
				{errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant='danger'>{error}</Message>
				) : (
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
						<Form.Group controlId='isadmin'>
							<Form.Check
								type='checkbox'
								label='Is Admin'
								id='isadmin'
								name='isadmin'
								checked={isAdmin}
								onChange={(e) => setIsAdmin(e.target.checked)}
							></Form.Check>
						</Form.Group>

						<Button type='submit' variant='light'>
							Update
						</Button>
					</Form>
				)}
			</FormContainer>
		</>
	)
}

export default UserEditScreen
