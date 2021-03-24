import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'

import {createOrder} from '../actions/orderActions'

const PlaceOrderScreen = ({history}) => {
	const dispatch = useDispatch()

	const {
		shippingAddress,
		shippingAddress: { address, city, postalCode, country },
		paymentMethod,
		cartItems,
		itemsPrice = cartItems.reduce((acc, curr) => acc + curr.price * curr.qty, 0),
    shippingPrice = itemsPrice > 100 ? 10 : 0,
    taxPrice = (itemsPrice * 0.15).toFixed(2),
    totalPrice = +itemsPrice + +shippingPrice + +taxPrice
	} = useSelector((state) => state.cart)

	const {order, success, error} = useSelector(state => state.orderCreate)

	useEffect(() => {
		if(success) {
			history.push(`/orders/${order._id}`)
		}
		// eslint-disable-next-line
	}, [success, history])

  const placeOrderHandler = () => {
    dispatch(createOrder({
			orderItems: cartItems,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			shippingPrice,
			taxPrice,
			totalPrice
		}))
  }

	return (
		<>
			<CheckoutSteps step1 step2 step3 step4 />
			<Row>
				<Col md={8}>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h4>Shipping</h4>
							<p>
								<strong>Address:</strong> <br />
								{address} <br />
								{postalCode} {city} <br />
								{country}
							</p>
						</ListGroup.Item>
						<ListGroup.Item>
							<h4>Payment Method</h4>
							<strong>Method: </strong> <br />
							{paymentMethod}
						</ListGroup.Item>
						<ListGroup.Item>
							<h4>Order Items</h4>
							{cartItems.length === 0 ? (
								<Message>Your Shopping Cart is Empty </Message>
							) : (
								<ListGroup variant='flush'>
									{cartItems.map((item, index) => (
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
									<Col className='text-right'>${itemsPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Shipping</Col>
									<Col className='text-right'>${shippingPrice.toFixed(2)}</Col>
								</Row>
							</ListGroup.Item>
              <ListGroup.Item>
              <Row>
                <Col>Tax</Col>
                <Col className='text-right'>${taxPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
            <Row>
              <Col>Total</Col>
              <Col className='text-right'>${totalPrice}</Col>
            </Row>
          </ListGroup.Item>
					<ListGroup.Item>
						{error && <Message variant='danger'>{error}</Message>}
					</ListGroup.Item>
          <ListGroup.Item>
            <Button type='button' className='btn-block' disabled={cartItems === 0} onClick={placeOrderHandler}>Place Order</Button>
        </ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	)
}

export default PlaceOrderScreen
