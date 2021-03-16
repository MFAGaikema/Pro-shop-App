import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../actions/productActions'

import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'

const Productscreen = ({ match, history }) => {
	const [qty, setQty] = useState(1)

	const dispatch = useDispatch()

	const productDetails = useSelector((state) => state.productDetails)

	const { product, loading, error } = productDetails

	const { image, name, rating, numReviews, description, countInStock, price } = product

	useEffect(() => {
		dispatch(listProductDetails(match.params.id))

		//eslint-disable-next-line
	}, [dispatch, match])

	const addToCartHandler = (e) => {
		e.preventDefault()
		history.push(`/cart/${match.params.id}?qty=${qty}`)
		
	}

	return (
		<>
			<Link to='/' className='btn btn-light my-3'>
				GO BACK
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Row>
					<Col md={6}>
						<Image src={image} alt={name} fluid />
					</Col>
					<Col md={3}>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<h5>{name}</h5>
							</ListGroup.Item>
							<ListGroup.Item>
								<Rating value={rating} text={`${numReviews} reviews`} />
							</ListGroup.Item>
							<ListGroup.Item>Description: {description}</ListGroup.Item>
						</ListGroup>
					</Col>
					<Col md={3}>
						<Card>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<Row>
										<Col>Price:</Col>
										<Col className='text-right'>
											<strong className='h5'>${price}</strong>
										</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Status:</Col>
										<Col className='h6 text-right'>{countInStock ? 'In Stock' : 'Out Of Stock'}</Col>
									</Row>
								</ListGroup.Item>
								{countInStock > 0 && (
									<ListGroup.Item>
										<Row>
											<Col>QTY</Col>
											<Col>
												<Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
													{[...Array(countInStock).keys()].map((num) => (
														<option key={num} value={num + 1}>
															{num + 1}
														</option>
													))}
												</Form.Control>
											</Col>
										</Row>
									</ListGroup.Item>
								)}
								<ListGroup.Item>
									<Button
										onClick={addToCartHandler}
										className='btn-block btn-light'
										type='button'
										disabled={!countInStock}
									>
										Add To Cart
									</Button>
								</ListGroup.Item>
							</ListGroup>
						</Card>
					</Col>
				</Row>
			)}
		</>
	)
}

export default Productscreen
