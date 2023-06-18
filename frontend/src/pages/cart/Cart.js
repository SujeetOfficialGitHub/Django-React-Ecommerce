import React, { useEffect } from 'react'
import classes from './Cart.module.css'
import {Row, Col, Card } from 'react-bootstrap'
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
            <>
            <div  className={classes['cart-items_container']}>
                {cart.map((item, index) => (
                    <Card key={index} className={classes['cart-items']}>
                        <div>
                            <Card.Img variant="top" src={item.image} className={classes['cart-items__image']}/>
                            <QuantityButton item={item}/>
                            <div className={classes['cart-items__sub-total']}>Rs. {item.selling_price*item.quantity}</div>
                        </div>
                        <Card.Body className={classes['cart-items__content']}>
                            <Card.Title as="h6">{item.product}</Card.Title>
                            <Card.Text>
                                <ProductPrice price={item.market_price} selling_price={item.selling_price}/>
                            </Card.Text>
                        </Card.Body>
                        <div>
                            <ButtonBox onClick={() => dispatch(deleteCartData({token, id: item.id}))} className="btn btn-danger btn-sm"><FaTrash/></ButtonBox>
                        </div>
                    </Card>
                ))}
            </div>
            <hr />
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
            </div>
            </>
      }

      </>
  )
}

export default Cart