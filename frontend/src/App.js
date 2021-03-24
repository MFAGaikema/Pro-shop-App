import Header from './components/Header'
import Footer from './components/Footer'
import Homescreen from './screens/Homescreen'
import Productscreen from './screens/Productscreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'

import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom'

const App = () => {
	return (
		<Router>
			<Header />
			<main className='py-3'>
				<Container>
					<Route exact path='/' component={Homescreen} />
					<Route path='/product/:id' component={Productscreen} />
					<Route path='/cart/:id?' component={CartScreen} />
					<Route path='/login' component={LoginScreen} />
					<Route path='/register' component={RegisterScreen} />
					<Route path='/profile' component={ProfileScreen} />
					<Route path='/shipping' component={ShippingScreen} />
					<Route path='/payment' component={PaymentScreen} />
					<Route path='/placeorder' component={PlaceOrderScreen} />
					<Route path='/orders/:id' component={OrderScreen} />
					<Route path='/admin/userlist' component={UserListScreen} />
					<Route path='/admin/users/:id' component={UserEditScreen} />
					<Route path='/admin/product/:id' component={ProductEditScreen} />
					<Route exact path='/admin/product' component={ProductListScreen} />
					<Route exact path='/admin/orders' component={OrderListScreen} />
				</Container>
			</main>
			<Footer />
		</Router>
	)
}

export default App
