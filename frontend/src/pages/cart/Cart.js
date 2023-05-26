import React, { useEffect } from 'react'
import ContainerBox from '../../components/ui/ContainerBox'
import { Table } from 'react-bootstrap'
import ButtonBox from '../../components/ui/ButtonBox'
import {FaTrash} from 'react-icons/fa'
import {AiOutlinePlusCircle, AiOutlineMinusCircle} from 'react-icons/ai'
import {useDispatch, useSelector} from 'react-redux'
import { fetchCartData } from '../../app/features/cartSlice'

const Cart = () => {
  const dispatch = useDispatch()
  const token = useSelector(state => state.auth.token)
  useEffect(() => {
    dispatch(fetchCartData({token}))
  },[dispatch, token])

  const cart = useSelector(state => state.cart.cart)
  return (
    <ContainerBox>
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
                {cart.length > 0 && cart.map((item) => (
                  <tr key={item.product.id}>
                    <td>1</td>
                    <td>No Image</td>
                    <td>{item.product.title}</td>
                    <td>
                      <span className='d-flex justify-content-between w-50 bg-success align-items-center text-light rounded'>
                          <ButtonBox className="btn btn-success btn-sm"><AiOutlineMinusCircle/></ButtonBox>
                          <span>{item.quantity}</span>
                          <ButtonBox className="btn btn-success btn-sm"><AiOutlinePlusCircle/></ButtonBox>
                      </span>
                    </td>
                    <td>{item.selling_price * item.quantity}</td>
                    <td>
                      <ButtonBox className="btn btn-danger btn-sm"><FaTrash/></ButtonBox>
                    </td>
                  </tr>
                ))}
            </tbody>
        </Table>
    </ContainerBox>
  )
}

export default Cart