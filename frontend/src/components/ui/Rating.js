import React from 'react'
import {AiFillStar} from 'react-icons/ai'
import {BsStar, BsStarHalf} from 'react-icons/bs'
const Rating = ({rating}) => {

  return (
    <div className={rating >= 3 ? "text-success" : "text-danger"}>
        <span>
            {rating >= 1
                ?  <AiFillStar/>
                : rating >= 0.5
                    ? <BsStarHalf/>
                    : <BsStar/>}
        </span>
        <span>
            {rating >= 2
                ?  <AiFillStar/>
                : rating >= 1.5
                    ? <BsStarHalf/>
                    : <BsStar/>}
        </span>
        <span>
            {rating >= 3
                ?  <AiFillStar/>
                : rating >= 2.5
                    ? <BsStarHalf/>
                    : <BsStar/>}
        </span>
        <span>
            {rating >= 4
                ?  <AiFillStar/>
                : rating >= 3.5
                    ? <BsStarHalf/>
                    : <BsStar/>}
        </span>
        <span>
            {rating >= 5
                ?  <AiFillStar/>
                : rating >= 4.5
                    ? <BsStarHalf/>
                    : <BsStar/>}
        </span>
    </div>
  )
}

export default Rating