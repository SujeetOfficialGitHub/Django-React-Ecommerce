import React, {useEffect} from 'react'
import SingleCarousel from '../../components/corousel/SingleCarousel'
import classes from './Home.module.css'

import MultiCarousel from '../../components/corousel/MultiCarousel'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProducts } from '../../app/features/productsSlice'

const Home = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAllProducts())
    },[dispatch])


    //  All Products 
    const products = useSelector(state => state.products.products)


    // Women's category products 
    const women = products.filter((item) => item && item.category && item.category.toLowerCase() === "women")
  
    // // men's category products 
    const mens = products.filter((item) => item && item.category && item.category.toLowerCase() === "men")



    return (
    <div className={classes.home}>
        <SingleCarousel />

        <section>
            <div className='d-flex justify-content-between'>
                <h3 className='p-0 m-0'>Women's Collection</h3>
                <Button variant='secondary'><Link to="/shop" className='text-light'>View all</Link></Button>
            </div>
            {women && <MultiCarousel products={women} />}
        </section>

        <section>
            <div className='d-flex justify-content-between'>
                <h3 className='p-0 m-0'>Men's Collection</h3>
                <Button variant='secondary'><Link to="/shop" className='text-light'>View all</Link></Button>
            </div>
            {mens && <MultiCarousel products={mens} />}
        </section>
    </div>
  )
}

export default Home