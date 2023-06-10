import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchAllProducts = createAsyncThunk('products/allProducts', async() => {
            const res = await axios.get(`/api/products/`)
            return res.data

})
export const fetchSingleProduct = createAsyncThunk('products/singleProduct', async({slug}) => {
            const res = await axios.get(`/api/products/${slug}/`)
            return res.data

})

export const fetchOrderedProduct = createAsyncThunk('products/fetchOrderedProduct', async({token}, {rejectWithValue}) => {
    try{
        const res = await axios.get(`/api/ordered_products/`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        return res.data
    }catch(error){
        console.log(error)
        return rejectWithValue(error.response.data.errors)
    }

})

const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        loading: false,
        orderedProducts: [],
        sortProducts: [],
        price: '',
        category: [],
        color: []
    },
    reducers: {
        // Insert/remove selected/unselected category into category state
        setCategoryFilter: (state, action) => {
            const {title, checked} = action.payload;
            if (checked){
                state.category.push(title)
            }else{
                state.category = state.category.filter(item => item !== title)
            } 
        },
        // Insert/remove selected/unselected color into color state
        setcolorFilter: (state, action) => {
            const {title, checked} = action.payload;
            if (checked){
                state.color.push(title)
            }else{
                state.color = state.color.filter(item => item !== title)
            } 
        },
        // Sorting products low to high and high to low 
        setPriceFilter: (state, action) => {
            // console.log(action.payload)
            if (action.payload === 'relevance'){
                state.price = action.payload
                state.sortProducts =  [...state.products];
            }else if (action.payload === 'highToLow'){
                state.price = action.payload
                state.sortProducts =  [...state.sortProducts].sort((a,b) => b.selling_price - a.selling_price);
            }else if (action.payload === 'lowToHigh'){
                state.price = action.payload
                state.sortProducts = [...state.sortProducts].sort((a,b) => a.selling_price - b.selling_price);
            }
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch all products 
            .addCase(fetchAllProducts.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.loading = false
                state.products = action.payload
                state.sortProducts = action.payload
            })
            .addCase(fetchAllProducts.rejected, (state, action) => {
                state.loading = false
                console.log(action)
            })

            // fetch single products 
            .addCase(fetchSingleProduct.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchSingleProduct.fulfilled, (state, action) => {
                state.loading = false
                
            })
            .addCase(fetchSingleProduct.rejected, (state, action) => {
                state.loading = false
                console.log(action)
            })
           
            .addCase(fetchOrderedProduct.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchOrderedProduct.fulfilled, (state, action) => {
                state.loading = false
                state.orderedProducts = action.payload
                
            })
            .addCase(fetchOrderedProduct.rejected, (state, action) => {
                state.loading = false
                console.log(action)
            })

           
    }
})
export const {setCategoryFilter, setPriceFilter, setcolorFilter} = productSlice.actions;
export default productSlice.reducer