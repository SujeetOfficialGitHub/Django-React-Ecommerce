import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { sellerProductList } from '../../app/features/sellerProductSlice';
import {Table} from 'react-bootstrap'

import SellerProducts from '../../components/product/SellerProducts';

const SellerProductListed = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(sellerProductList())
  },[dispatch])

  const sellerProductsList = useSelector(state => state.sellerProducts.sellerProducts);
  return (
    <Table striped bordered hover>
      <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Category</th>
            <th>Title</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sellerProductsList && sellerProductsList.map((item, i) => (
            <SellerProducts 
              key={item.id}
              i={i}
              item={item}
            />
          ))}
    </tbody>
  </Table>
  )
}

export default SellerProductListed