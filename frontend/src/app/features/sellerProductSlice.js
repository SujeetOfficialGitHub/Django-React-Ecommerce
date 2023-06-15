import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

export const sellerProductList = createAsyncThunk('sellerProduct/allProducts', async() => {
    try{
        const res = await axios.get('/api/seller-products-listing/', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        return res.data
    }catch(error){
        console.log(error)
    }
})

export const sellerProductUpdate = createAsyncThunk('sellerProduct/updateProduct', async({slug, enteredData},{rejectWithValue}) => {
    try{
        const res = await axios.put(`/api/seller-products-listing/${slug}`, enteredData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        return res.data
    }catch(error){
        console.log(error)
        return rejectWithValue(error.response.data.errors)
    }
})
export const sellerProductDelete = createAsyncThunk('sellerProduct/deleteProduct', async({slug}, {rejectWithValue}) => {
    try{
        const res = await axios.delete(`/api/seller-products-listing/${slug}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        return res.data
    }catch(error){
        return rejectWithValue(error.response.data.errors)
    }
})

export const sellerAddProduct = createAsyncThunk('sellerProduct/addProduct', async({enteredData}, {rejectWithValue}) => {
    try{
        const res = await axios.post('/api/seller-products-listing/', enteredData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        return res.data
    } catch(error){
        return rejectWithValue(error.response.data.errors)
    }
})


const sellerProductSlice = createSlice({
    name: 'sellerProduct', 
    initialState: {
        sellerProducts: [],
        loading: false
    },
    extraReducers: (builder) => {
        builder
            // fetch all products 
            .addCase(sellerProductList.pending, (state) => {
                state.loading = true
            })
            .addCase(sellerProductList.fulfilled, (state, action) => {
                state.loading = false
                state.sellerProducts = action.payload
            })
            .addCase(sellerProductList.rejected, (state) => {
                state.loading = false
            })

            // Update products
            .addCase(sellerProductUpdate.pending, (state) => {
            state.loading = true
            })
            .addCase(sellerProductUpdate.fulfilled, (state, action) => {
                state.loading = false
                console.log(action)
                state.sellerProducts = state.sellerProducts.map(item => {
                    if (item.id === action.payload.id){
                        return action.payload;
                    }else{
                        return item
                    }
                })
                
            })
            .addCase(sellerProductUpdate.rejected, (state, action) => {
                state.loading = false
                // console.log(action)
            })

                
            // Delete products
            .addCase(sellerProductDelete.pending, (state) => {
                state.loading = true
            })
            .addCase(sellerProductDelete.fulfilled, (state, action) => {
                state.loading = false
                state.sellerProducts = state.sellerProducts.filter(item => item.slug !== action.payload.slug)

                
            })
            .addCase(sellerProductDelete.rejected, (state, action) => {
                state.loading = false
                // console.log(action)
            })


             // Add Products 
            .addCase(sellerAddProduct.pending, (state) => {
                state.loading = true
            })
            .addCase(sellerAddProduct.fulfilled, (state, action) => {
                state.loading = false
                state.sellerProducts = [action.payload, ...state.sellerProducts]
                
            })
            .addCase(sellerAddProduct.rejected, (state, action) => {
                state.loading = false
                // console.log(action)
            })
    
    }
})

export default sellerProductSlice.reducer