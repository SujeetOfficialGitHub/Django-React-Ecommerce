import React from 'react'
import {Card, Button} from 'react-bootstrap'
import Rating from '../ui/Rating'
import {HiShoppingCart} from 'react-icons/hi'
import {AiFillHeart} from 'react-icons/ai'
import {Link} from 'react-router-dom'
import ProductPrice from '../ui/ProductPrice'
import classes from './Product.module.css'

import {useDispatch, useSelector} from 'react-redux'
import { addToCart } from '../../app/features/cartSlice'
import QuantityButton from '../ui/QuantityButton'

import { fetchCartData } from '../../app/features/cartSlice'

const Product = ({product}) => {
  const token = useSelector(state => state.auth.token)
  const cart = useSelector(state => state.cart.cart);
  const dispatch = useDispatch()

  
  
  const addToCartHandler = async(product) => {
    const item = {
      id: product.id,
      market_price: product.market_price,
      selling_price: product.selling_price,
      quantity: 1,
    }
    await dispatch(addToCart({item, token}))
    await dispatch(fetchCartData({token}))
  }
  

  const in_cart = cart.find(item => item.product === product.title)



  return (
    <Card  className={`${classes.product} mt-3`}>
            <Link to={`/product/${product.slug}`} className={`${classes['product-image']}`}>
                <Card.Img variant="top" src={product.image} />
            </Link>
            <Card.Body>
                {/* <Card.Text className='p-0 m-0'>{product.brand.title}</Card.Text> */}
                <Card.Title className={`${classes['product-title']} p-0 m-0 text-capitalize`}>{product.title.length > 30 ? product.title.substr(0,30)+'...' : product.title}</Card.Title>
                {/* <Rating rating={product.rating} /> */}
                <Card.Text>
                    <ProductPrice price={product.market_price} selling_price={product.selling_price} />
                </Card.Text>
                <div className='d-flex justify-content-between'>
                    <Button variant="success w-25"><AiFillHeart /> </Button>
           
                    {!in_cart && <Button onClick={() => addToCartHandler(product)} variant="primary w-50">+<HiShoppingCart/></Button>}
                    {in_cart &&  <QuantityButton item={in_cart} /> }
                </div>
            </Card.Body>

        </Card>
  )
}

export default Product