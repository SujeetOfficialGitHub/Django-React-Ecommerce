import React, {useEffect} from 'react'
import classes from './Shop.module.css'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../../components/product/Product'
import { fetchAllProducts, setCategoryFilter, setPriceFilter } from '../../app/features/productsSlice'
import {Row, Col, Form} from 'react-bootstrap'
const Shop = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAllProducts())
    },[dispatch])

    // Get selected price option value 
    const filterPrice = useSelector(state => state.products.price)

    // Low to high/High to low sorted according to price
    const sortProducts = useSelector(state => state.products.sortProducts)

    // Get selected category 
    const category = useSelector(state => state.products.category)

    // Filter products according to selected category in sortedProducts
    const filteredProducts = sortProducts.filter(item => category.includes(item.category.toLowerCase()))

    return (
    <Row className={`${classes.shop} mx-auto`}>
        <Col lg={3} mg={3} sm={3} xs={4} className={classes['filter-section']}>
            <label>
                Sort by <br/>
                <select value={filterPrice} onChange={(e) => dispatch(setPriceFilter(e.target.value))}>
                    <option value="">Select</option>
                    <option value="lowToHigh">Low to High</option>
                    <option value="highToLow">High to Low</option>
                </select>
            </label>
            <hr />
            <div className="mb-3"> 
                <p className='p-0 m-0'>Category</p>
                <Form.Check type="checkbox">
                    <Form.Check.Input type='checkbox' onChange={(e) => dispatch(setCategoryFilter({checked: e.target.checked, title: "men"}))} isValid />
                    <Form.Check.Label>Mens</Form.Check.Label>
                </Form.Check>
                <Form.Check type="checkbox">
                    <Form.Check.Input type='checkbox' onChange={(e) => dispatch(setCategoryFilter({checked: e.target.checked, title: "women"}))} isValid />
                    <Form.Check.Label>Womens</Form.Check.Label>
                </Form.Check>
            </div>
        </Col>
        <Col lg={9} mg={9} sm={9} xs={8} className={classes['product-section']}>
            {filteredProducts.length <1 && sortProducts && sortProducts.map(product => (
                <Product key={product.id} product={product} className={classes.product}/>
            ))}
            {filteredProducts && filteredProducts.map(product => (
                <Product key={product.id} product={product} className={classes.product}/>
            ))}
        </Col>
    </Row>
  )
}

export default Shop