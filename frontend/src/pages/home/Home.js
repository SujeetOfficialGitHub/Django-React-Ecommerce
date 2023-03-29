import React, {useEffect} from 'react'
import SingleCarousel from '../../components/corousel/SingleCarousel'
import classes from './Home.module.css'

import MultiCarousel from '../../components/corousel/MultiCarousel'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProducts } from '../../app/features/productSlice'

const Home = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllProducts())
  },[dispatch])

  const products = useSelector(state => state.products.products)
console.log(products)
  const fragrances = products.filter((item) => item.category === "fragrances")
  const homeDecoration = products.filter((item) => item.category === "home-decoration")
  const groceries = products.filter((item) => item.category === "groceries")

  return (
    <div className={classes.home}>
      <SingleCarousel />

      <section>
        <div className='d-flex justify-content-between'>
          <h3 className='p-0 m-0'>Fragrances</h3>
          <Button variant='secondary'><Link className='text-light'>View all</Link></Button>
        </div>
        {products && <MultiCarousel products={fragrances} />}
      </section>

      <section>
      <div className='d-flex justify-content-between'>
          <h3 className='p-0 m-0'>Home Decoration"</h3>
          <Button variant='secondary'><Link className='text-light'>View all</Link></Button>
        </div>
        {products && <MultiCarousel products={homeDecoration} />}
      </section>

      <section>
      <div className='d-flex justify-content-between'>
          <h3 className='p-0 m-0'>Groceries</h3>
          <Button variant='secondary'><Link className='text-light'>View all</Link></Button>
        </div>
        {products && <MultiCarousel products={groceries} />}
      </section>
    </div>
  )
}

export default Home