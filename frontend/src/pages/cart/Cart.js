import React, { useEffect } from 'react'
import { Table, Image } from 'react-bootstrap'
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
      <>
        <h2 className='text-center p-2'>My Cart</h2><hr />
        {loading && <h2 className='p-5 m-5 text-center'>Loading...</h2>}
        {!loading && cart.length<1 && <h4 className='text-center p-4 m-4'>Your Cart is Empty</h4>}
        {!loading && cart.length>0 &&
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
                <th></th>
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
            <tfoot style={{background: 'LightGray'}}>
                <tr>
                  <th className='bg-light border0' colSpan={5}></th>
                  <th>Cart Total</th>
                  <td>Rs. {totalAmount && totalAmount}</td>
                </tr>
                <tr>
                  <th className='bg-light border0' colSpan={5}></th>
                  <th>You Save</th>
                  <td>Rs. {marketPrice-sellingPrice}</td>
                </tr>
                <tr>
                  <th className='bg-light border0' colSpan={5}></th>
                  <th>Shipping fee</th>
                  <td>Rs. {ShippingFee}</td>
                </tr>
                <tr>
                  <th className='bg-light border0' colSpan={5}></th>
                  <th>Payable Amount</th>
                  <td>Rs. {totalAmount + ShippingFee}</td>
                </tr>
                <tr>
                  <td className='bg-light border0' colSpan={5} ></td>
                  <td className='bg-light border0'>
                  <RazorpayIntegrations cart={cart} totalAmount={totalAmount+ShippingFee} />
                 
                  </td>
                </tr>
            </tfoot>
        </Table>
      }


      </>
    </>
  )
}

export default Cart