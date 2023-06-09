import React, { useEffect } from 'react'
import classes from './Cart.module.css'
import { Table, Image, Row, Col } from 'react-bootstrap'
import ButtonBox from '../../components/ui/ButtonBox'
import {FaTrash} from 'react-icons/fa'
import {useDispatch, useSelector} from 'react-redux'
import { deleteCartData, fetchCartData } from '../../app/features/cartSlice'
import ProductPrice from '../../components/ui/ProductPrice'
import QuantityButton from '../../components/ui/QuantityButton'
import RazorpayIntegrations from '../../components/PaymentIntegration/RazorpayIntegrations'
const Cart = () => {
  const dispatch = useDispatch()
  const token = useSelector(state => state.auth.token)
  useEffect(() => {
    dispatch(fetchCartData({token}))
  },[dispatch, token])

  const {cart, totalAmount, loading} = useSelector(state => state.cart)

  const marketPrice = cart.reduce((initialVal, currVal) => initialVal + currVal.market_price * currVal.quantity,0)
  const sellingPrice = cart.reduce((initialVal, currVal) => initialVal + currVal.selling_price * currVal.quantity,0)
  const ShippingFee = 50;
  

  return (
      <>
        <h2 className='text-center p-2'>My Cart</h2><hr />
        {loading && <h2 className='loading'>Loading...</h2>}
        {!loading && cart.length<1 && <h4 className='text-center p-4 m-4'>Your Cart is Empty</h4>}
        {cart.length>0 &&
        <Row>
        <Col lg={8}>
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>#</th>
                <th>Image</th>
                <th>Title</th>
                <th>quantity</th>
                <th>Price</th>
                <th>Total</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {cart.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index+1}</td>
                    <td><Image style={{width: '4rem', height: '4rem'}} src={item.image} /></td>
                    <td>{item.product}</td>
                    <td>
                       <QuantityButton item={item}/>
                    </td>
                    <td><ProductPrice price={item.market_price} selling_price={item.selling_price}/></td>
                    <td>Rs. {item.selling_price*item.quantity}</td>
                    <td>
                      <ButtonBox onClick={() => dispatch(deleteCartData({token, id: item.id}))} className="btn btn-danger btn-sm"><FaTrash/></ButtonBox>
                    </td>
                  </tr>
                ))}
            </tbody>
        </Table>
        </Col>
        <Col lg={4}>
        <div className={classes['cart-total']}>
          <Row>
            <Col>Cart Total</Col>
            <Col>Rs. {totalAmount && totalAmount}</Col>
          </Row>
          <Row>
            <Col>You Save</Col>
            <Col>Rs. {marketPrice-sellingPrice}</Col>
          </Row>
          <Row>
            <Col>Shipping fee</Col>
            <Col>Rs. {ShippingFee}</Col>
          </Row>
          <Row>
            <Col>Payable Amount</Col>
            <Col>Rs. {totalAmount + ShippingFee}</Col>
          </Row>
          <Row>
          <RazorpayIntegrations cart={cart} totalAmount={totalAmount+ShippingFee} />
          </Row>
        </div></Col>
        </Row>
      }

      </>
  )
}

export default Cart