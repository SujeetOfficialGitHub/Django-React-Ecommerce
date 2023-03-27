import React from 'react'
import classes from './Footer.module.css'
import { Row, Col, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {FaFacebookSquare} from 'react-icons/fa'
import {BsInstagram, BsLinkedin} from 'react-icons/bs'
const Footer = () => {
  return (
    <>
    <div className='bg-dark'>
        <Container>
            <Row  className={`text-light ${classes.footer}`}>
                <Col lg={3} sm={6} xs={6}>
                    <h5>ABOUT</h5>
                    <p>Address XYZ 400400</p>
                </Col>
                <Col lg={3} sm={6} xs={6}>
                    <h5>POLICY INFO</h5>
                    <Link to="/#privacy-policy" className='nav-link'>Privacy Policy</Link>
                    <Link to="/#terms-of-sale" className='nav-link'>Terms of Sale</Link>
                    <Link to="/#terms-of-use" className='nav-link'>Terms of Use</Link>
                    <Link to="/#faq" className='nav-link'>FAQ</Link>
                </Col>
                <Col lg={3} sm={6} xs={6}>
                    <h5>Links</h5>
                    <Link to="/home" className='nav-link'>Home</Link>
                    <Link to="/about" className='nav-link'>About</Link>
                    <Link to="/contact" className='nav-link'>Contact us</Link>
                </Col>
                <Col lg={3} sm={6} xs={6}>
                    <h5>Social Media</h5>
                    <Link to="/#facebook" className='nav-link align-items-center'><FaFacebookSquare className='m-2 bg-primary'/>Facebook</Link>
                    <Link to="/#instagram" className='nav-link align-items-center'><BsInstagram className='m-2 bg-danger'/>Instagram</Link>
                    <Link to="/linkedin" className='nav-link align-items-center'><BsLinkedin className='m-2 bg-primary'/>Linkedin</Link>
                </Col>
            </Row>
        </Container>

    </div>
    <div className="bg-dark mt-1 p-3 text-center">
        <h5 className={classes['credit-name']}>Developed by <span>Sujeet Kushwaha</span></h5>
    </div>
    </>
  )
}

export default Footer