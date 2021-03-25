import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails, clearProductDetails, createReview } from '../actions/productActions'
import { PRODUCT_REVIEW_RESET } from '../constants/productConstants'

import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'

const Productscreen = ({ match, history }) => {
	const [qty, setQty] = useState(1)
	const [productRating, setProductRating] = useState(0)
	const [comment, setComment] = useState('')

	const dispatch = useDispatch()

	const { user } = useSelector((state) => state.userLogin)

	const { success: successReview, error: errorReview } = useSelector((state) => state.productReview)

	const { product, loading, error } = useSelector((state) => state.productDetails)

	useEffect(() => {
		if (successReview) {
			alert('Review Submitted')

			setProductRating(0)
			setComment('')

			dispatch({
				type: PRODUCT_REVIEW_RESET,
			})
		}

		dispatch(listProductDetails(match.params.id))
	}, [dispatch, match, successReview])

	const addToCartHandler = (e) => {
		e.preventDefault()
		history.push(`/cart/${match.params.id}?qty=${qty}`)
	}

	const clickHandler = () => {
		dispatch(clearProductDetails())
	}

	const submitHandler = (e) => {
		e.preventDefault()

		dispatch(
			createReview(match.params.id, {
				rating: productRating,
				comment,
			})
		)
	}

	return (
		<>
		
			<Link to='/' onClick={clickHandler} className='btn btn-light my-3'>
				GO BACK
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<>
				<Row>
				<Col md={6}>
							<Image src={product.image} alt={product.name} fluid />
						</Col>
						<Col md={3}>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<h5>{product.name}</h5>
								</ListGroup.Item>
								<ListGroup.Item>
									<Rating value={product.rating} text={`${product.numReviews} reviews`} />
								</ListGroup.Item>
								<ListGroup.Item>Description: {product.description}</ListGroup.Item>
							</ListGroup>
						</Col>
						<Col md={3}>
							<Card>
								<ListGroup variant='flush'>
									<ListGroup.Item>
										<Row>
											<Col>Price:</Col>
											<Col className='text-right'>
												<strong className='h5'>${product.price}</strong>
											</Col>
										</Row>
									</ListGroup.Item>
									<ListGroup.Item>
										<Row>
											<Col>Status:</Col>
											<Col className='h6 text-right'>{product.countInStock ? 'In Stock' : 'Out Of Stock'}</Col>
										</Row>
									</ListGroup.Item>
									{product.countInStock > 0 && (
										<ListGroup.Item>
											<Row>
												<Col>QTY</Col>
												<Col>
													<Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
														{[...Array(product.countInStock).keys()].map((num) => (
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
											disabled={!product.countInStock}
										>
											Add To Cart
										</Button>
									</ListGroup.Item>
								</ListGroup>
							</Card>
						</Col>
					</Row>
					<Row>
						<Col md={6}>
							<h4>Reviews</h4>
							{product.numReviews === 0 && <h6 className='text-center px-4 py-2 btn-light'>No Reviews</h6>}
							<ListGroup variant='flush'>
								{product.reviews.map((review) => (
									<ListGroup.Item key={review._id}>
										<strong>{review.name}</strong>
										<Rating value={review.rating} />
										<p>{review.createdAt.substring(0, 10)}</p>
										<p>{review.comment}</p>
									</ListGroup.Item>
								))}
								<ListGroup.Item>
									<h5>Write a customer review</h5>
									{errorReview && <Message variant='danger'>{errorReview}</Message>}
									{user ? (
										<Form onSubmit={submitHandler}>
											<Form.Group controlId='rating'>
												<Form.Label>Rating</Form.Label>
												<Form.Control
													as='select'
													value={productRating}
													onChange={(e) => setProductRating(e.target.value)}
												>
													<option value=''>Select</option>
													<option value='1'>1 -- poor</option>
													<option value='2'>2 -- not so great</option>
													<option value='3'>3 -- average</option>
													<option value='4'>4 -- great</option>
													<option value='5'>5 -- excellent</option>
												</Form.Control>
											</Form.Group>
											<Form.Group controlId='comment'>
												<Form.Label>Comment</Form.Label>
												<Form.Control
													as='textarea'
													row='3'
													value={comment}
													onChange={(e) => setComment(e.target.value)}
												></Form.Control>
											</Form.Group>
											<Button type='submit' variant='light'>
												Submit review
											</Button>
										</Form>
									) : (
										<h6 className='text-center px-4 py-2 btn-light'>
											Please <Link to='/login'>login</Link> to leave a review
										</h6>
									)}
								</ListGroup.Item>
							</ListGroup>
						</Col>
					</Row>
					<Meta title={product.name ? product.name : 'product'}/>
				</>
			)}
		</>
	)
}

export default Productscreen
