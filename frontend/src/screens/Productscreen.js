import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Rating from '../components/Rating'
import products from '../products'

const Productscreen = ({ match }) => {
	const product = products.find((product) => product._id === match.params.id)
	return (
		<>
			<Link to='/' className='btn btn-light my-3'>
				GO BACK
			</Link>
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
							<ListGroup.Item>
								<Button className='btn-block btn-light' type='button' disabled={!product.countInStock}>
									Add To Cart
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	)
}

export default Productscreen
