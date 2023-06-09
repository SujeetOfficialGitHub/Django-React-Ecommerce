import React from 'react'

const ProductPrice = ({price, selling_price}) => {
    const discount = parseInt(((price - selling_price) * 100) / price)
 
  return (
    <>
        <b>Rs. {selling_price} </b>
        <small><del>Rs. {price} </del></small>
        <b className='text-success'> {discount}%off</b>
    </>
  )
}

export default ProductPrice