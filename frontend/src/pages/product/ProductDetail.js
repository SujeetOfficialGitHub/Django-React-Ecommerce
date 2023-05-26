import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import {Row, Col, Image, Button} from 'react-bootstrap'
import ContainerBox from '../../components/ui/ContainerBox'
import classes from './ProductDetail.module.css'
import {HiShoppingCart} from 'react-icons/hi'
import {AiFillHeart, AiOutlineMinusCircle, AiOutlinePlusCircle} from 'react-icons/ai'
import Rating from '../../components/ui/Rating'
import ProductPrice from '../../components/ui/ProductPrice'
import { fetchAllProducts } from '../../app/features/productSlice'
import axios from 'axios'

const ProductDetail = () => {
    const {slug} = useParams()
    const [selectedImage, setSelectedImage] = useState()

    const dispatch = useDispatch()

    useEffect(() => {
        const fetchSingleProduct = async() => {
            const res = await axios.get(`api/products/${slug}`);
            console.log(res)
        }
        fetchSingleProduct()
    },[slug])

    const products = useSelector(state => state.products.products)
    const getProduct = products.filter((item) => item.slug === slug)
    const product = getProduct[0]
    // Get All Images 
    const images = product.product_variant.map((item) => item.image)
    console.log(images)
    console.log(product)

    return (
        <ContainerBox>
        {product && 
        <Row className='mt-3 mb-3'>
            <Col sm={12} md={6} lg={6}>
                <div className={classes['main-image']}>
                    <Image src={selectedImage ? selectedImage : images[0]} />
                </div>
                <div className={classes['image-list']}>
                    {images.map((item, index) => 
                        <Image 
                            key={index} 
                            src={item} 
                            onClick = {() => setSelectedImage(item)}
                        />
                    )}
                </div>
                <div className={`${classes.buttons} d-flex justify-content-between`}>
                    <Button style={{marginRight: '5px'}} variant="success w-50"><AiFillHeart /> </Button>
                    {/* <Button variant="primary w-50">+<HiShoppingCart/></Button> */}
                    <span className='d-flex justify-content-between w-50 bg-primary align-items-center text-light rounded'>
                        <Button><AiOutlineMinusCircle/></Button>
                        <span>5</span>
                        <Button><AiOutlinePlusCircle/></Button>
                    </span>
                </div>
            </Col>
            <Col sm={12} md={6} lg={6}>
                <div>
                    <p className='p-0 m-0'>{product.brand.brand_title}</p>
                    <h2 className='p-0 m-0'>{product.title}</h2>
                    <Rating rating={product.rating} />
                    <ProductPrice price={product.price} selling_price={product.selling_price} />
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