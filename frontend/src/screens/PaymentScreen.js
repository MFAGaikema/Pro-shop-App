import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Form, Button, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'

import { savePaymentMethod } from '../actions/cartActions'

const PaymentScreen = ({ history }) => {
	const dispatch = useDispatch()

	const { shippingAddress } = useSelector((state) => state.cart)

	if (!shippingAddress) {
		history.push('/shipping')
	}

	const [paymentMethod, setPaymentMethod] = useState('PayPal')

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(savePaymentMethod(paymentMethod))
		history.push('/placeorder')
	}

	return (
		<FormContainer>
			<CheckoutSteps step1 step2 step3 />
			<h3>Payment Method</h3>
			<Form onSubmit={submitHandler}>
				<Form.Group>
					<Form.Label as='legend'>Select method</Form.Label>
					<Col>
						<Form.Check
							type='radio'
							label='Paypal or Credit Card'
							id='PayPal'
							name='paymentMethod'
							value={paymentMethod}
              checked
							onChange={(e) => setPaymentMethod(e.target.value)}
						></Form.Check>
            <Form.Check
            type='radio'
            label='iDeal'
            id='iDeal'
            name='paymentMethod'
            value='iDeal'
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></Form.Check>
					</Col>
				</Form.Group>
        
				<Button type='submit' variant='light'>
					Continue
				</Button>
			</Form>
		</FormContainer>
	)
}

export default PaymentScreen
