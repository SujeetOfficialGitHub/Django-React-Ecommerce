import React, {useEffect, useState} from 'react'
import { Form } from 'react-bootstrap'
import InputBox from '../../components/ui/InputBox'
import ContainerBox from '../../components/ui/ContainerBox'
import ButtonBox from '../../components/ui/ButtonBox'
import {useDispatch, useSelector} from 'react-redux'
import { sellerProductUpdate } from '../../app/features/sellerProductSlice'
import { fetchAllCategory } from '../../app/features/categorySlice'
import { fetchSingleProduct } from '../../app/features/productsSlice'
import {  useNavigate, useParams } from 'react-router-dom'

const UpdateProduct = () => {
    const [values, setValues] = useState({
        category: '',
        title: '',
        market_price: 0,
        selling_price: 0,
        description: '',
        image: '',
        showImage: ''
    })

    const {slug} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchAllCategory())
    },[dispatch])
    
    useEffect(() => {
        dispatch(fetchSingleProduct({slug})).unwrap()
        .then(res => setValues(res))
        .catch(error => console.log(''))
    },[dispatch, slug]);


    const categoryList = useSelector(state => state.category.categoryList)
    

    const submitHandler = (e) => {
        e.preventDefault()
        const enteredData = new FormData();
        enteredData.append('category', values.category)
        enteredData.append('title', values.title)
        enteredData.append('description', values.description)
        enteredData.append('market_price', values.market_price)
        enteredData.append('selling_price', values.selling_price)
        enteredData.append('image', values.image)

        dispatch(sellerProductUpdate({slug, enteredData}))
        .unwrap()
        .then(res => {
            setValues({
                category: '',
                title: '',
                market_price: 0,
                selling_price: 0,
                description: '',
                image: '',
                showImage: ''
            })
            navigate('/products-listed')
        })
        .catch(err => console.log(''))
    }
    const imageHandler = (e) => {
        if (e.target.files && e.target.files[0]) {
            setValues({...values, showImage: URL.createObjectURL(e.target.files[0]), image: e.target.files[0]});
        }
        //  console.log(e.target.value)
        // setValues({...values, image: e.target.files[0]})
    }

  return (
    <ContainerBox className='mt-5 mb-5'>
        <h3 className='text-center'>Update Product</h3>
        <Form onSubmit={submitHandler}>
            {/* show category form database */}
            {categoryList.length>0 &&
                <Form.Select value={values.category} onChange={(e) =>  setValues({...values, category: e.target.value})} aria-label="category">
                    <option>Select Category</option>
                    {categoryList.map(item => (
                        <option key={item.id} value={item.title}>{item.title}</option>
                    ))}
                </Form.Select>
            }

            <InputBox 
                label="Title"
                type="text"
                value={values.title}
                onChange={(e) => setValues({...values, title: e.target.value})}
                placeholder="Enter product title"
                // required
            />

            <InputBox 
                label="M. R. P."
                type="number"
                value={values.market_price}
                onChange={(e) => setValues({...values, market_price: e.target.value})}
                placeholder="Enter product M. R. P."
                // required
            />
           
            <InputBox 
                label="Selling Price"
                type="number"
                value={values.selling_price}
                onChange={(e) => setValues({...values, selling_price: e.target.value})}
                placeholder="Enter product selling price"
                // required
            />
            
            <InputBox 
                label="Description"
                type="text"
                value={values.description}
                onChange={(e) => setValues({...values, description: e.target.value})}
                placeholder="Enter product description"
                // required
            />
            
            <InputBox 
                label="Product Image"
                type="file"
                onChange={imageHandler}
                // required
            />
            <img style={{width: '5rem', height: '4rem', border: '1px solid black'}} src={values.showImage || values.image} alt={values.title} /><br/>

            <ButtonBox className="mt-3" type="submit" >update Product</ButtonBox>
        </Form>

        {/* Show currnent uploaded image  */}
        {/* <img src={URL.createObjectURL(values.image)} alt="" /> */}
    </ContainerBox>
  )
}

export default UpdateProduct