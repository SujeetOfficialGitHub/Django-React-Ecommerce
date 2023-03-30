import React from 'react'

const ProductPrice = ({price, selling_price}) => {
    const discount = parseInt(((price - selling_price) * 100) / price)
 
  return (
    <h5>
        <span>${selling_price} </span>
        <small><del>{price} </del></small>
        <span className='text-success'> {discount}%off</span>
    </h5>
  )
}

export default ProductPrice