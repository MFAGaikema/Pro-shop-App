import React from 'react'
import { Card } from 'react-bootstrap'

import Rating from './Rating'
import { Link } from 'react-router-dom'

const Product = ({ product }) => {
	return (
		<Card className='my-3 p-3 rounded'>
			<Link to={`/product/${product._id}`}>
				<Card.Img src={product.image} variant='top' />
			</Link>
			<Card.Body className='px-0'>
				<Link to={`/product/${product._id}`}>
					<Card.Title className='card-title' as='div'>
						{product.name}
					</Card.Title>
				</Link>
				<Card.Text as='div'>
					<Rating value={product.rating} text={`${product.numReviews} reviews`} />
				</Card.Text>
				<Card.Text className='mt-4 text-right' as='h5'>
					${product.price}
				</Card.Text>
			</Card.Body>
		</Card>
	)
}

export default Product
