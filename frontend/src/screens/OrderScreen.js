import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'

import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'

import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants'

const OrderScreen = ({ match, history }) => {
	const dispatch = useDispatch()

	const orderId = match.params.id

	const [sdkReady, setSdkReady] = useState(false)

	const { user } = useSelector((state) => state.userLogin)
	const { order, loading, error } = useSelector((state) => state.orderDetails)
	const { loading: loadingPay, success: successPay } = useSelector((state) => state.orderPay)
	const { loading: loadingDeliver, success: successDeliver } = useSelector((state) => state.orderDeliver)

	useEffect(() => {
		if(!user) {
			history.push('/login')
		}
		const addPayPalScript = async () => {
			const { data: clientId } = await axios.get('/api/config/paypal')

			const script = document.createElement('script')
			script.type = 'text/javascript'
			script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
			script.async = true
			script.onload = () => {
				setSdkReady(true)
			}
			document.body.appendChild(script)
		}
		if (!order || successPay || successDeliver || order._id !== orderId) {
			dispatch({
				type: ORDER_PAY_RESET,
			})
			dispatch({
				type: ORDER_DELIVER_RESET,
			})

			dispatch(getOrderDetails(orderId))
		} else if (!order.isPayed) {
			if (!window.paypal) {
				addPayPalScript()
			} else {
				setSdkReady(true)
			}
		}

		// eslint-disable-next-line
	}, [dispatch, orderId, successPay, successDeliver, history, order])

	const successPaymentHandler = (paymentResult) => {
		dispatch(payOrder(orderId, paymentResult))
	}

	const deliverHandler = () => {
		dispatch(deliverOrder(order))
	}

	//const { shippingAddress: {address, city, postalCode, country}, paymentMethod, orderItems, itemsPrice, taxPrice, shippingPrice, totalPrice} = order

	return loading ? (
		<Loader />
	) : error ? (
		<Message variant='danger'>{error}</Message>
	) : (
		order !== undefined && (
			<>
				<h4>Order {order._id}</h4>
				<Row>
					<Col md={8}>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<h4>Shipping</h4>
								<p>
									<strong>Name: </strong> {order.user.name}
								</p>
								<p>
									<strong>Email: </strong> {order.user.email}
								</p>
								<p>
									<strong>Address:</strong> <br />
									{order.shippingAddress.address} <br />
									{order.shippingAddress.postalCode} {order.shippingAddress.city} <br />
									{order.shippingAddress.country}
								</p>
								{order.isDelivered ? (
									<p className='payed'>Delivered on {order.deliveredAt}</p>
								) : (
									<p className='not-payed'>Order is not delivered yet</p>
								)}
							</ListGroup.Item>
							<ListGroup.Item>
								<h4>Payment Method</h4>
								<p>
									<strong>Method: </strong> <br />
									{order.paymentMethod}
								</p>
								{order.isPayed ? (
									<p className='payed'>Payed on {order.payedAt}</p>
								) : (
									<p className='not-payed'>Order is not payed yet</p>
								)}
							</ListGroup.Item>
							<ListGroup.Item>
								<h4>Order Items</h4>
								{order.orderItems.length === 0 ? (
									<Message>You don't have any orders</Message>
								) : (
									<ListGroup variant='flush'>
										{order.orderItems.map((item, index) => (
											<ListGroup.Item key={item.product}>
												<Row>
													<Col md={1}>
														<Image src={item.image} alt={item.name} fluid rounded />
													</Col>
													<Col md={7}>
														<Link to={`/product/${item.product}`}>{item.name}</Link>
													</Col>
													<Col md={4}>
														{item.qty} x {item.price} = {(item.qty * item.price).toFixed(2)}
													</Col>
												</Row>
											</ListGroup.Item>
										))}
									</ListGroup>
								)}
							</ListGroup.Item>
						</ListGroup>
					</Col>
					<Col md={4}>
						<Card>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<h4>Order Summery</h4>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Items</Col>
										<Col className='text-right'>${order.itemsPrice}</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Shipping</Col>
										<Col className='text-right'>${order.shippingPrice.toFixed(2)}</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Tax</Col>
										<Col className='text-right'>${order.taxPrice.toFixed(2)}</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Total</Col>
										<Col className='text-right'>${order.totalPrice}</Col>
									</Row>
								</ListGroup.Item>
								{loadingDeliver && <Loader />}
								{!order.isPayed && (
									<ListGroup.Item>
										{loadingPay && <Loader />}
										{!sdkReady ? (
											<Loader />
										) : (
											<PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />
										)}
									</ListGroup.Item>
								)}
								{user && user.isAdmin && order.isPayed && !order.isDelivered && (
									<ListGroup.Item>
										<Button type='button' variant='light' className='btn btn-block' onClick={deliverHandler}>Set to Delivered</Button>
									</ListGroup.Item>
								)}
							</ListGroup>
						</Card>
					</Col>
				</Row>
			</>
		)
	)
}

export default OrderScreen
