import React from 'react'
import classes from './MultiCarousel.module.css'
import Carousel from "react-multi-carousel";
import {Card, Row, Col, Button} from 'react-bootstrap'
import Rating from '../ui/Rating'
import {HiShoppingCart} from 'react-icons/hi'
import {AiFillHeart, AiOutlineMinusCircle, AiOutlinePlusCircle} from 'react-icons/ai'
import {Link} from 'react-router-dom'


const MultiCarousel = (props) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 5 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 700 },
      items: 3,
      slidesToSlide: 3 // optional, default to 1.
    },

    mobile: {
      breakpoint: { max: 700, min: 0 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    }
  };
  return (
  <Carousel
    additionalTransfrom={0}
    arrows
    autoPlaySpeed={3000}
    centerMode={false}
    className=''
    // customLeftArrow={<CustomLeftArrow />}
    // customRightArrow={<CustomRightArrow />}
    dotListClass=""
    draggable
    focusOnSelect={false}
    infinite
    itemClass={classes['carousel-item']}
    keyBoardControl
    minimumTouchDrag={80}
    pauseOnHover
    renderArrowsWhenDisabled={false}
    renderButtonGroupOutside={false}
    renderDotsOutside={false}
    responsive={responsive}
    rewind={false}
    rewindWithAnimation={false}
    rtl={false}
    shouldResetAutoplay
    showDots={false}
    sliderClass={classes.slider}
    slidesToSlide={1}
    swipeable
    partialVisible={false}
  >
    {props.products.map((product) => (
        <Card key={product.id} className={`${classes.product} mt-3`}>
            <Link to={`/product/${product.slug}`}>
                <Card.Img variant="top" src={product.thumbnail} />
            </Link>
            <Card.Body>
                <Card.Text className='p-0 m-0'>{product.brand.brand_title}</Card.Text>
                <Card.Title className={`${classes['product-title']} 'p-0 m-0'`}>{product.title.length > 30 ? product.title.substr(0,30)+'...' : product.title}</Card.Title>
                <Rating rating={product.rating} />
                <Card.Text>
                    ${product.price} 
                    <del> 200</del>
                    <span> 40% off</span>
                </Card.Text>
                <div className='d-flex justify-content-between'>
                    <Button variant="success w-25"><AiFillHeart /> </Button>
                    <Button variant="primary w-50">+<HiShoppingCart/></Button>
                    {/* <span className='d-flex justify-content-between w-50 bg-primary align-items-center text-light rounded'>
                        <Button><AiOutlineMinusCircle/></Button>
                        <span>5</span>
                        <Button><AiOutlinePlusCircle/></Button>
                    </span> */}
                </div>
            </Card.Body>
        </Card>
    ))}
</Carousel>
  )
}

export default MultiCarousel