import React, { useEffect } from 'react'
import ContainerBox from '../../components/ui/ContainerBox'
import { Table, Image } from 'react-bootstrap'
import ButtonBox from '../../components/ui/ButtonBox'
import {FaTrash} from 'react-icons/fa'
import {useDispatch, useSelector} from 'react-redux'
import { deleteCartData, fetchCartData } from '../../app/features/cartSlice'
import ProductPrice from '../../components/ui/ProductPrice'
import QuantityButton from '../../components/ui/QuantityButton'
const Cart = () => {
  const dispatch = useDispatch()
  const token = useSelector(state => state.auth.token)
  useEffect(() => {
    dispatch(fetchCartData({token}))
  },[dispatch, token])

  const {cart, loading} = useSelector(state => state.cart)

  return (
    <>
      <ContainerBox>
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
                    <td>
                      <ButtonBox onClick={() => dispatch(deleteCartData({token, id: item.id}))} className="btn btn-danger btn-sm"><FaTrash/></ButtonBox>
                    </td>
                  </tr>
                ))}
            </tbody>
        </Table>
      }
      </ContainerBox>
    </>
  )
}

export default Cart