import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {Row, Col, Image, Button} from 'react-bootstrap'
import ContainerBox from '../../components/ui/ContainerBox'
import classes from './ProductDetail.module.css'
import {HiShoppingCart} from 'react-icons/hi'
import {AiFillHeart} from 'react-icons/ai'
// import Rating from '../../components/ui/Rating'
import ProductPrice from '../../components/ui/ProductPrice'
import { fetchSingleProduct } from '../../app/features/productsSlice'
import QuantityButton from '../../components/ui/QuantityButton'
import { addToCart, fetchCartData } from '../../app/features/cartSlice'

const ProductDetail = () => {
    const [product, setProduct] = useState([]);
    const {slug} = useParams()
    const token = useSelector(state => state.auth.token)
    const cart = useSelector(state => state.cart.cart);


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchSingleProduct({slug}))
        .unwrap()
        .then((obj) => setProduct(obj))
        .catch((error) => console.log(error))
    },[dispatch, slug])

    const addToCartHandler = async() => {
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
        <ContainerBox>
        {product && 
        <Row className='mt-3 mb-3'>
            <Col sm={12} md={6} lg={6}>
                <div className={classes['main-image']}>
                    <Image src={product.image} />
                </div>
            </Col>
            <Col sm={12} md={6} lg={6}>
                <div>
                    <p className='p-0 m-0'>{product.brand}</p>
                    <h2 className='p-0 m-0'>{product.title}</h2>
                    {/* <Rating rating={product.rating} /> */}
                    <ProductPrice price={product.market_price} selling_price={product.selling_price} />
                </div>
                <div className={`${classes.buttons} d-flex justify-content-between`}>
                    <Button style={{marginRight: '5px'}} variant="success w-50 fs-3"><AiFillHeart /> </Button>
                    {!in_cart && <Button onClick={addToCartHandler} variant="primary w-50">+<HiShoppingCart className='fs-5'/></Button>}
                    {in_cart &&  <QuantityButton item={in_cart} /> }
                </div>
                <div>
                    <h6 className='mt-3'>Description</h6>
                    <p>{product.description}</p>
                </div>
            </Col>
        </Row>
    }
    </ContainerBox>
  )
}

export default ProductDetail