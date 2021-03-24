import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { getUsers, deleteUser } from '../actions/userActions'

import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'

const UserListScreen = ({ history }) => {
	const dispatch = useDispatch()

	const { users, loading, error } = useSelector((state) => state.userList)

	const { user } = useSelector((state) => state.userLogin)

	const { success } = useSelector((state) => state.userDelete)

	useEffect(() => {
		if (user && user.isAdmin) {
			dispatch(getUsers())
		} else {
			history.push('/')
		}
	}, [dispatch, user, history, success])

	const deleteHandler = (id) => {
		if (window.confirm(`Are you sure you want to delete ID# ${id}?`)) {
			dispatch(deleteUser(id))
		}
	}

	return (
		<>
			<h4>Users</h4>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Table striped bordered hover responsive className='table-sm'>
					<thead>
						<tr>
							<th>ID</th>
							<th>Name</th>
							<th>Email</th>
							<th>Admin</th>
							<th></th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => (
							<tr key={user._id}>
								<td className='align-middle'>{user._id}</td>
								<td className='align-middle'>{user.name}</td>
								<td className='align-middle'>
									<a href={`mailto:${user.email}`}>{user.email}</a>
								</td>
								<td className='text-center align-middle'>
									{user.isAdmin ? (
										<i className='fas fa-check' style={{ color: 'green' }}></i>
									) : (
										<i className='fas fa-times' style={{ color: 'red' }}></i>
									)}
								</td>
								<td className='text-center align-middle'>
									<LinkContainer to={`/admin/users/${user._id}/edit`}>
										<Button variant='light'>
											<i className='far fa-edit'></i>
										</Button>
									</LinkContainer>
								</td>
								<td className='text-center align-middle'>
									<Button variant='danger' onClick={() => deleteHandler(user._id)}>
										<i className='fas fa-trash'></i>
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</>
	)
}

export default UserListScreen
