import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { listOrders } from '../actions/orderActions'

import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'

const OrderListScreen = ({ history }) => {
	const dispatch = useDispatch()

	const { orders, loading, error } = useSelector((state) => state.orderList)

	const { user } = useSelector((state) => state.userLogin)

	useEffect(() => {
		if (user && user.isAdmin) {
			dispatch(listOrders())
		} else {
			history.push('/login')
		}
	}, [dispatch, user, history])

	return (
		<>
			<h4>Orders</h4>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Table striped bordered hover responsive className='table-sm'>
					<thead>
						<tr>
							<th>ID</th>
							<th>User</th>
							<th>Date</th>
							<th>Total Price</th>
							<th>Is paid</th>
							<th>Is delivered</th>
							<th></th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{orders.map((order) => (
							<tr key={order._id}>
								<td className='align-middle'>{order._id}</td>
								<td className='align-middle'>{order.user && order.user.name}</td>
								<td className='align-middle'>{order.createdAt.substring(0,10)}</td>
								<td className='align-middle'>${order.totalPrice}</td>
								<td className='align-middle'>
									{order.isPayed ? <><i className='fas fa-check ml-3' style={{ color: 'green' }}></i><span className='ml-3'>{order.payedAt.substring(0,10)}</span></>
										
									 : (
										<i className='fas fa-times' style={{ color: 'red' }}></i>
									)}
								</td>
                <td className='text-center align-middle'>
                  {order.isDelivered ? <><i className='fas fa-check ml-3' style={{ color: 'green' }}></i><span className='ml-3'>{order.payedAt.substring(0,10)}</span></>
                 : (
                  <i className='fas fa-times' style={{ color: 'red' }}></i>
                )}
              </td>
								<td className='text-center align-middle'>
									<LinkContainer to={`/orders/${order._id}`}>
										<Button variant='light'>
											Details
										</Button>
									</LinkContainer>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</>
	)
}

export default OrderListScreen