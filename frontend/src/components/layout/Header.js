import React from 'react'
import {NavLink} from 'react-router-dom'
import {Navbar, Container, Form, Button, Nav, NavDropdown} from 'react-bootstrap'
import {HiShoppingCart} from 'react-icons/hi'
import {FaUserAlt} from 'react-icons/fa'
import classes from './Header.module.css'

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark p-3" sticky="top">
        <Container>
            <Navbar.Brand>
                <NavLink to="/" className="nav-link">Shop</NavLink>
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
                <Button className={classes['header-cart-icon']}><HiShoppingCart/></Button>
                <Nav className={classes['header-user-icon']}>
                    <NavDropdown title={<FaUserAlt/>}  id="collasible-nav-dropdown"  align="end">
                        <NavDropdown.Item as="div" className='bg-dark'>
                            <NavLink to="/profile" className="nav-link">Profile</NavLink>
                            <NavLink to="/change-password" className="nav-link">Change Password</NavLink>
                            <NavLink to="/signup" className="nav-link">Sign up</NavLink>
                            <NavLink to="/login" className="nav-link">Login</NavLink>
                            <Button className='bg-dark border-0 p-2'>Logout</Button>
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </div>
        </Container>
    </Navbar>
  )
}

export default Header