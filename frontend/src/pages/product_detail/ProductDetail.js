import React, { useEffect, useState } from 'react'
import {useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import {Row, Col, Image, Button} from 'react-bootstrap'
import ContainerBox from '../../components/ui/ContainerBox'
import classes from './ProductDetail.module.css'
import {HiShoppingCart} from 'react-icons/hi'
import {AiFillHeart} from 'react-icons/ai'
// import Rating from '../../components/ui/Rating'
import ProductPrice from '../../components/ui/ProductPrice'
import { fetchSingleProduct } from '../../app/features/productsSlice'

const ProductDetail = () => {
    const [product, setProduct] = useState([]);
    const {slug} = useParams()


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchSingleProduct({slug}))
        .unwrap()
        .then((obj) => setProduct(obj))
        .catch((error) => console.log(error))
    },[dispatch, slug])

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
                    <Button variant="primary w-50">+<HiShoppingCart className='fs-5'/></Button>
                    {/* <span className='d-flex justify-content-between w-50 bg-primary align-items-center text-light rounded fs-5'>
                        <Button><AiOutlineMinusCircle className='fs-5'/></Button>
                        <span>5</span>
                        <Button><AiOutlinePlusCircle className='fs-5'/></Button>
                    </span> */}
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