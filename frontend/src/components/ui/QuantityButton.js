import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ButtonBox from './ButtonBox';
import { updateCartData } from '../../app/features/cartSlice';
import {AiOutlinePlusCircle, AiOutlineMinusCircle} from 'react-icons/ai';

const QuantityButton = ({item}) => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);

  return (
    <span className='d-flex w-50 align-items-center text-light rounded'>
        <ButtonBox onClick={() => dispatch(updateCartData({token, id: item.id, quantity: -1}))} className="btn btn-success btn-sm"><AiOutlineMinusCircle/></ButtonBox>
        <span className='text-dark m-1'>{item.quantity}</span>
        <ButtonBox onClick={() => dispatch(updateCartData({token, id: item.id, quantity: 1}))} className="btn btn-success btn-sm"><AiOutlinePlusCircle/></ButtonBox>
    </span>
  )
}

export default QuantityButton