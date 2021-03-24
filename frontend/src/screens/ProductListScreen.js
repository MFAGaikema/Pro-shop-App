import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { listProducts, deleteProduct, createProduct } from '../actions/productActions'
import {PRODUCT_CREATE_RESET} from '../constants/productConstants'

import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'

const ProductListScreen = ({ history, match }) => {
	const dispatch = useDispatch()

	const { products, loading, error } = useSelector((state) => state.productList)
	const { success: successDelete, loading: loadingDelete, error: errorDelete } = useSelector((state) => state.productDelete)
	const { success: successCreate, loading: loadingCreate, error: errorCreate, product: createdProduct } = useSelector((state) => state.productCreate)

	const { user } = useSelector((state) => state.userLogin)

	useEffect(() => {
		dispatch({
			type: PRODUCT_CREATE_RESET
		})

		if (!user || !user.isAdmin) {
      history.push('/login')
    }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`)
    } else {
      dispatch(listProducts())
    }

	}, [dispatch, history, user, successDelete, successCreate, createdProduct])

	const deleteHandler = (id, name) => {
		if (window.confirm(`Are you sure you want to delete ${name}?`)) {
			dispatch(deleteProduct(id))
		} 
	}

  const createProductHandler = () => {
    dispatch(createProduct())
	}

	return (
		<>
    <Row className='align-items-center'>
      <Col><h4>Products</h4></Col>
      <Col className='text-right'>
        <Button className='my-3 btn-dark' onClick={createProductHandler}><i className="fas fa-plus"></i> Create Product</Button>
      </Col>
    </Row>
    {loadingDelete && <Loader />}
    {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

		{loadingCreate && <Loader />}
    {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
			
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Table striped bordered hover responsive className='table-sm'>
					<thead>
						<tr>
							<th>ID</th>
							<th>Product Name</th>
							<th>Price</th>
							<th>In stock</th>
							<th>Category</th>
							<th>Brand</th>
							<th></th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{products.map((product) => (
							<tr key={product._id}>
								<td className='align-middle'>{product._id}</td>
								<td className='align-middle'>{product.name}</td>
								<td className='align-middle'>${product.price}</td>

								<td className='text-center align-middle'>
									{product.countInStock > 0 ? product.countInStock
									 : 
										<i className='fas fa-times' style={{ color: 'red' }}></i>
									}
								</td>
                <td className='align-middle'>{product.category}</td>
                <td className='align-middle'>{product.brand}</td>
								<td className='text-center align-middle'>
									<LinkContainer to={`/admin/product/${product._id}/edit`}>
										<Button variant='light'>
											<i className='far fa-edit'></i>
										</Button>
									</LinkContainer>
								</td>
								<td className='text-center align-middle'>
									<Button variant='danger' onClick={() => deleteHandler(product._id, product.name)}>
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

export default ProductListScreen