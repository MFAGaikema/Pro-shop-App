import React, {useState, useEffect} from 'react'
import { Navbar, Nav, NavDropdown,	 Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import {useDispatch, useSelector} from 'react-redux'
import {logout, resetUserProfile} from '../actions/userActions'

const Header = () => {
	const dispatch = useDispatch()

	const {user} = useSelector(state => state.userLogin)
	const userName = useSelector(state => state.userUpdateProfile)

	const [name, setName] = useState('')

	useEffect(() => {
		if(userName.user) {
			setName(userName.user.name)
		} else {
			if(user !== null) {
				setName(user.name)
			}
		}	
	}, [userName, user])

	const logoutHandler = () => {
		dispatch(logout())
		dispatch(resetUserProfile())
	}

	return (
		<header>
			<Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
				<Container>
					<LinkContainer to='/'>
						<Navbar.Brand>PRO-SHOP</Navbar.Brand>
					</LinkContainer>

					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='ml-auto'>
							<LinkContainer to='/cart'>
								<Nav.Link>
									<i className='fas fa-shopping-cart'></i> Cart
								</Nav.Link>
							</LinkContainer>
							{!(user === undefined || user === null) ? !(user ===  undefined || user === null) && user.isAdmin ? 							
								<NavDropdown title='Admin' id='adminmenu'>
								<LinkContainer to='/profile'>
								<NavDropdown.Item>Profile</NavDropdown.Item>
							</LinkContainer>
							<LinkContainer to='/admin/userlist'>
								<NavDropdown.Item>Users</NavDropdown.Item>
							</LinkContainer>
							<LinkContainer to='/admin/product'>
							<NavDropdown.Item>Products</NavDropdown.Item>
						</LinkContainer>
						<LinkContainer to='/admin/orders'>
						<NavDropdown.Item>Orders</NavDropdown.Item>
					</LinkContainer>
							<NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
						</NavDropdown> :
								<NavDropdown title={name} id='username'>
									<LinkContainer to='/profile'>
										<NavDropdown.Item>Profile</NavDropdown.Item>
									</LinkContainer>
									<NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
								</NavDropdown> 
								:
								(<LinkContainer to='/login'>
									<Nav.Link>
										<i className='fas fa-user'></i> Sign In
									</Nav.Link>
								</LinkContainer>)
							}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	)
}

export default Header
