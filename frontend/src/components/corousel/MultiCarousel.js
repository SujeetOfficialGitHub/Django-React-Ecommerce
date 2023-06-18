import React from 'react'
import classes from './MultiCarousel.module.css'
import Carousel from "react-multi-carousel";
import Product from '../product/Product';


const MultiCarousel = (props) => {




  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1200 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1200, min: 768 },
      items: 3,
    },

    mobile: {
      breakpoint: { max: 768, min: 480 },
      items: 2,
    },
    smallMobile: {
      breakpoint: { max: 480, min: 0 },
      items: 1,
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
    // infinite
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
        <Product key={product.id} product={product}/>
    ))}
</Carousel>
  )
}

export default MultiCarousel