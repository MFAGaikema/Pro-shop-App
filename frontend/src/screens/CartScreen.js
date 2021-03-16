import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'

import {useDispatch, useSelector} from 'react-redux'
import {addToCart, removeFromCart} from '../actions/cartActions'

import {Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap'
import Message from '../components/Message'

const CartScreen = ({match, location, history}) => {

  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)

  const {cartItems} = cart

  const productId = match.params.id

  const qty = location.search ? location.search.split('').slice(-1).join('') : 1

  useEffect(() => {
    productId && dispatch(addToCart(productId, qty))
  }, [dispatch, productId, qty])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
    history.replace('/cart')
  }

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
  }

  return (
    <Row>
      <Col md={8}>
        <h3>Shopping Cart</h3>
        {
          cartItems.length === 0 ? <Message>Your cart is empty <Link to='/'>Go back</Link></Message> :
          <ListGroup variant='flush'>
            {cartItems.map(item => 
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded/>
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                  <Form.Control as='select' value={item.qty} onChange={(e) => dispatch(addToCart(item.product, +e.target.value))}>
                  {[...Array(item.countInStock).keys()].map((num) => (
                    <option key={num} value={num + 1}>
                      {num + 1}
                    </option>
                  ))}
                </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button type='button' variant='light' onClick={() => removeFromCartHandler(item.product) }><i className='fas fa-trash'></i></Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            )}
          </ListGroup>
        }
      </Col>
      <Col md={4}>
        <Card>
        <ListGroup variant='flush'>
          <ListGroup.Item>
            <h4 className='text-right'>Total Items ({ cartItems.reduce((acc, curr) => acc + curr.qty, 0)})</h4>
            <h5 className='text-right'>Subtotal ${ cartItems.reduce((acc, curr) => acc + curr.qty * curr.price, 0).toFixed(2)}</h5>
          </ListGroup.Item>
          <ListGroup.Item>
            <Button variant='light' type='button' className='btn-block' disabled={cartItems.length === 0} onClick={checkoutHandler}>Go To Checkout</Button>
          </ListGroup.Item>
        </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen
