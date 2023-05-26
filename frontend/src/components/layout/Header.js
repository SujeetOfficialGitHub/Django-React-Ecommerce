import React from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import {Navbar, Container, Form, Button, Nav, NavDropdown} from 'react-bootstrap'
import {HiShoppingCart} from 'react-icons/hi'
import {FaUserAlt} from 'react-icons/fa'
import classes from './Header.module.css'
import { authActions } from '../../app/features/authSlice'
import { useDispatch, useSelector } from 'react-redux'

const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isLoggedIn = useSelector(state => state.auth.isAuthenticated)
    const logoutHandler = () => {
        dispatch(authActions.logout())
        navigate('/login')
    }

    const cartHandler = () => {
        navigate('/cart')
    }
  return (
    <Navbar bg="dark" variant="dark p-3" sticky="top">
        <Container>
            <Navbar.Brand>
                <NavLink to="/" className="nav-link fs-3"><b>Shop</b></NavLink>
            </Navbar.Brand>
            <Form className="d-flex">
                <Form.Control
                type="search"
                placeholder="Search here..."
                className={classes['search-input']}
                aria-label="Search"
                />
            </Form>
            <div className='d-flex'>
                <Button onClick={cartHandler} className={classes['header-cart-icon']}><HiShoppingCart/></Button>
                <Nav className={classes['header-user-icon']}>
                    <NavDropdown title={<FaUserAlt/>}  id="collasible-nav-dropdown"  align="end">
                        <NavDropdown.Item as="div" className='bg-dark border border-success rounded'>
                            {isLoggedIn && <NavLink to="/profile" className="nav-link">Profile</NavLink>}
                            {isLoggedIn && <NavLink to="/change-password" className="nav-link">Change Password</NavLink>}
                            {!isLoggedIn && <NavLink to="/signup" className="nav-link">Sign up</NavLink>}
                            {!isLoggedIn && <NavLink to="/login" className="nav-link">Login</NavLink>}
                            <NavLink to="/add-products" className="nav-link">Add Products</NavLink>
                            <NavLink to="/products-listed" className="nav-link">Products List</NavLink>

                            {isLoggedIn && <Button onClick={logoutHandler} className='bg-dark border-0 p-2'>Logout</Button>}
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </div>
        </Container>
    </Navbar>
  )
}

export default Header