import React, {useEffect} from 'react'
import classes from './Shop.module.css'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../../components/product/Product'
import { fetchAllProducts, setCategoryFilter, setPriceFilter, setcolorFilter } from '../../app/features/productsSlice'
import {Row, Col, Form} from 'react-bootstrap'
import {fetchAllCategory} from '../../app/features/categorySlice'
import {fetchAllColor} from '../../app/features/colorSlice'
const Shop = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAllProducts())
        dispatch(fetchAllCategory())
        dispatch(fetchAllColor())
    },[dispatch])

    // Get all category from database 
    const categoryList = useSelector(state => state.category.categoryList)
    // Get all color from database 
    const colorList = useSelector(state => state.color.colorsList)

    // Get selected price option value 
    const filterPrice = useSelector(state => state.products.price)

    // Low to high/High to low sorted according to price
    const sortProducts = useSelector(state => state.products.sortProducts)

    // Get selected category 
    const category = useSelector(state => state.products.category)

    // Get selected color 
    const color = useSelector(state => state.products.color)


    // Filter products according to selected category in sortedProducts
    let filteredProducts = [...sortProducts]
    if (category && category.length>0){
        filteredProducts = filteredProducts.filter(item => category.includes(item.category.toLowerCase()))
    }
    if (color && color.length>0){
        filteredProducts = filteredProducts.filter(item => color.includes(item.color && item.color.toLowerCase()))
    }
    return (
    <Row className={`${classes.shop} mx-auto`}>
        <Col lg={3} mg={3} sm={3} xs={4} className={classes['filter-section']}>
            <label>
                Sort by <br/>
                <select value={filterPrice} onChange={(e) => dispatch(setPriceFilter(e.target.value))}>
                    <option value="">Select</option>
                    <option value="relevance">Relevance</option>
                    <option value="lowToHigh">Low to High</option>
                    <option value="highToLow">High to Low</option>
                </select>
            </label>
            <hr />
            <div className="mb-3"> 
                <p className='p-0 m-0'>Category</p>
                <Form>
                {categoryList &&categoryList.length >0 &&categoryList.map(item => (
                    <Form.Check key={item.id} type="checkbox">
                            <Form.Check.Input type='checkbox' onChange={(e) => dispatch(setCategoryFilter({checked: e.target.checked, title: item.title.toLowerCase()}))} isValid checked={'checked' ? category.includes(item.title.toLowerCase()) : ''} />
                            <Form.Check.Label>{item.title}</Form.Check.Label>
                        </Form.Check>

                ))}
                </Form>
            </div>
            <hr />
            <div className="mb-3"> 
                <p className='p-0 m-0'>Color</p>
                <Form>
                {colorList &&colorList.length >0 &&colorList.map(item => (
                    <Form.Check key={item.id} type="checkbox">
                        <Form.Check.Input type='checkbox' onChange={(e) => dispatch(setcolorFilter({checked: e.target.checked, title: item.title.toLowerCase()}))} isValid checked={'checked' ? color.includes(item.title.toLowerCase()) : ''} />
                        <Form.Check.Label>{item.title}</Form.Check.Label>
                    </Form.Check>
                ))}
                </Form>
            </div>
        </Col>
        <Col lg={9} mg={9} sm={9} xs={8} className={classes['product-section']}>
            {filteredProducts && filteredProducts.length >0 && filteredProducts.map(product => (
                <Product key={product.id} product={product} className={classes.product}/>
            ))}
        </Col>
    </Row>
  )
}

export default Shop