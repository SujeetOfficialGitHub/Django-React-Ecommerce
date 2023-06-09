import React, { useEffect } from 'react'
import ContainerBox from '../../components/ui/ContainerBox'
import { Table, Image } from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'

import { fetchOrderedProduct } from '../../app/features/productsSlice'

const OrderedProduct = () => {
      const dispatch = useDispatch()
      const token = useSelector(state => state.auth.token)
      useEffect(() => {
        dispatch(fetchOrderedProduct({token}))
      },[dispatch, token])
    
      const {orderedProducts, loading} = useSelector(state => state.products)

    
      return (
        <>
          <ContainerBox>
            <h2 className='text-center p-2'>My Orders</h2><hr />
            {loading && <h2 className='p-5 m-5 text-center'>Loading...</h2>}
            {!loading && orderedProducts.length<1 && <h4 className='text-center p-4 m-4'>Your haven't ordered anything, Please shop now</h4>}
            {!loading && orderedProducts.length>0 &&
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Title</th>
                    <th>quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    {orderedProducts.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index+1}</td>
                        <td><Image style={{width: '4rem', height: '4rem'}} src={item.image} /></td>
                        <td>{item.title}</td>
                        <td>{item.quantity}</td>
                        <td>Rs. {item.price}</td>
                        <td>Rs. {item.price*item.quantity}</td>
                      </tr>
                    ))}
                </tbody>
            </Table>
          }
    
    
          </ContainerBox>
        </>
      )
    }
    

export default OrderedProduct