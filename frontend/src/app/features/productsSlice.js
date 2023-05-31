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
        orderedProducts: []
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

export default productSlice.reducer