import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'

import { saveShippingAddress } from '../actions/cartActions'

const ShippingScreen = ({ history }) => {
  const dispatch = useDispatch()

	const { shippingAddress } = useSelector((state) => state.cart)

	const [address, setAddress] = useState(shippingAddress.address)
	const [city, setCity] = useState(shippingAddress.city)
	const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
	const [country, setCountry] = useState(shippingAddress.country)

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(saveShippingAddress({
      address, city, postalCode, country
    }))
    history.push('/payment')
	}

	return (
		<FormContainer>
			<CheckoutSteps step1 step2/>
			<h3>Shipping</h3>
			<Form onSubmit={submitHandler}>
				<Form.Group controlId='address'>
					<Form.Label>Address</Form.Label>
					<Form.Control
						type='text'
						placeholder='enter address'
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						required
					></Form.Control>
				</Form.Group>
				<Form.Group controlId='city'>
					<Form.Label>City</Form.Label>
					<Form.Control
						type='text'
						placeholder='enter city'
						value={city}
						onChange={(e) => setCity(e.target.value)}
						required
					></Form.Control>
				</Form.Group>
				<Form.Group controlId='postalCode'>
					<Form.Label>Postal Code</Form.Label>
					<Form.Control
						type='text'
						placeholder='enter postal code'
						value={postalCode}
						onChange={(e) => setPostalCode(e.target.value)}
						required
					></Form.Control>
				</Form.Group>
				<Form.Group controlId='country'>
					<Form.Label>Country</Form.Label>
					<Form.Control
						type='text'
						placeholder='enter country'
						value={country}
						onChange={(e) => setCountry(e.target.value)}
						required
					></Form.Control>
				</Form.Group>
				<Button type='submit' variant='light'>
					Continue
				</Button>
			</Form>
		</FormContainer>
	)
}

export default ShippingScreen
