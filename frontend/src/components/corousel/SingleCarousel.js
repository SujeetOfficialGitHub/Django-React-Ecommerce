import React from 'react'
import classes from './SingleCarousel.module.css'
import Carousel from "react-multi-carousel";
// import {FiArrowRightCircle} from 'react-icons/fi'

const SingleCarousel = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };
  return (
  <Carousel
    additionalTransfrom={0}
    arrows
    autoPlaySpeed={3000}
    centerMode={false}
    className=''
    containerClass=""
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
    sliderClass={classes.carousel}
    slidesToSlide={1}
    swipeable
  >
  <div>
    <img src="https://source.unsplash.com/random/nature/" alt="" />
  </div>
  <div>
    <img src="https://source.unsplash.com/random/laptop/" alt="" />
  </div>
  <div>
    <img src="https://source.unsplash.com/random/mobile/" alt="" />
  </div>
  <div>
    <img src="https://source.unsplash.com/random/electronics/" alt="" />
  </div>
  <div>
    <img src="https://source.unsplash.com/random/fashion/" alt="" />
  </div>
  <div>
    <img src="https://source.unsplash.com/random/nature/" alt="" />
  </div>
  <div>
    <img src="https://source.unsplash.com/random/nature/" alt="" />
  </div>
</Carousel>
  )
}

export default SingleCarousel