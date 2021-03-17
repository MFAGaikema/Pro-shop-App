import React from 'react'
import { Navbar, Nav, NavDropdown,	 Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import {useDispatch, useSelector} from 'react-redux'
import {logout} from '../actions/userActions'

const Header = () => {
	const dispatch = useDispatch()

	const {user} = useSelector(state => state.userLogin)

	const logoutHandler = () => {
		dispatch(logout())
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
							{!(user === undefined || user === null) ? 
								<NavDropdown title={user.name} id='username'>
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
