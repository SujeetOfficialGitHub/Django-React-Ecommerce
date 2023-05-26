import React, {useEffect, useReducer} from 'react'
import { Form } from 'react-bootstrap'
import InputBox from '../../components/ui/InputBox'
import ContainerBox from '../../components/ui/ContainerBox'
import ButtonBox from '../../components/ui/ButtonBox'
import {useDispatch, useSelector} from 'react-redux'
import { sellerAddProduct } from '../../app/features/sellerProductSlice'
import { fetchAllCategory } from '../../app/features/categorySlice'
import { useNavigate } from 'react-router-dom'

// constants for reducer 
const CATEGORY = "CATEGORY";
const TITLE = 'TITLE';
const MARKET_PRICE = 'MARKET_PRICE';
const SELLING_PRICE = 'SELLING_PRICE';
const DESCRIPTION = 'DESCRIPTION';
const IMAGE = 'IMAGE';

const productInitialState = {
    category: '',
    title: '',
    market_price: 0,
    selling_price: 0,
    description: '',
    image: ''
}

const productReducer = (state, action) => {
    switch (action.type) {
        case CATEGORY:
            return {...state, category: action.category}
        case TITLE:
            return {...state, title: action.title}
        case MARKET_PRICE:
            return {...state, market_price: action.market_price}
        case SELLING_PRICE:
            return {...state, selling_price: action.selling_price}
        case DESCRIPTION:
            return {...state, description: action.description}
        case IMAGE:
            return {...state, image: action.image}
    
        default:
            return state
    }
}
const AddProducts = () => {
    const [productState, productDispatch] = useReducer(productReducer, productInitialState)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchAllCategory())
    },[dispatch])

    const categoryList = useSelector(state => state.category.categoryList)
    

    const submitHandler = (e) => {
        e.preventDefault()
        const enteredData = new FormData();
        enteredData.append('category', productState.category)
        enteredData.append('title', productState.title)
        enteredData.append('description', productState.description)
        enteredData.append('market_price', productState.market_price)
        enteredData.append('selling_price', productState.selling_price)
        enteredData.append('image', productState.image)

        dispatch(sellerAddProduct({enteredData}))
        .unwrap()
        .then(res => {
            productDispatch({type: CATEGORY, category: ''})
            productDispatch({type: TITLE, title: ''})
            productDispatch({type: DESCRIPTION, description: ''})
            productDispatch({type: MARKET_PRICE, market_price: ''})
            productDispatch({type: SELLING_PRICE, selling_price: ''})
            productDispatch({type: IMAGE, image: ''})
            navigate('/products-listed')
        })
        .catch(err => console.log(err))
    }

  return (
    <ContainerBox className='mt-5 mb-5'>
        <h3 className='text-center'>Add Product</h3>
        <Form onSubmit={submitHandler}>
            {/* show category form database */}
            {categoryList.length>0 &&
                <Form.Select value={productState.category} onChange={(e) => productDispatch({type: CATEGORY, category: e.target.value})} aria-label="category">
                    <option>Select Category</option>
                    {categoryList.map(item => (
                        <option key={item.id} value={item.title}>{item.title}</option>
                    ))}
                </Form.Select>
            }

            <InputBox 
                label="Title"
                type="text"
                value={productState.title}
                onChange={(e) => productDispatch({type: TITLE, title: e.target.value})}
                placeholder="Enter product title"
                // required
            />

            <InputBox 
                label="M. R. P."
                type="number"
                value={productState.market_price}
                onChange={(e) => productDispatch({type: MARKET_PRICE, market_price: e.target.value})}
                placeholder="Enter product M. R. P."
                // required
            />
           
            <InputBox 
                label="Selling Price"
                type="number"
                value={productState.selling_price}
                onChange={(e) => productDispatch({type: SELLING_PRICE, selling_price: e.target.value})}
                placeholder="Enter product selling price"
                // required
            />
            
            <InputBox 
                label="Description"
                type="text"
                value={productState.description}
                onChange={(e) => productDispatch({type: DESCRIPTION, description: e.target.value})}
                placeholder="Enter product description"
                // required
            />
            
            <InputBox 
                label="Product Image"
                type="file"
                onChange={(e) => productDispatch({type: IMAGE, image: e.target.files[0]})}
                // required
            />

            <ButtonBox type="submit" >Add Product</ButtonBox>
        </Form>
        {/* Show uploaded image  */}
        {/* {image && <img src={URL.createObjectURL(image)} alt="" />} */}
    </ContainerBox>
  )
}

export default AddProducts