import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

export const addToCart = createAsyncThunk('cart/addToCart', async({item, token},{rejectWithValue}) => {
    try{
        const res = await axios.post(`/api/cart/`, item, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
    }catch(error){
        console.log(error)
        return rejectWithValue(error)
    }
})

export const fetchCartData = createAsyncThunk('cart/fetchCartData', async({token},{rejectWithValue}) => {
    try{
        const res = await axios.get(`/api/cart/`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        return res.data.products
    }catch(error){
        console.log(error)
        return rejectWithValue(error)
    }
})

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
        totalAmout: 0
    },
    extraReducers: (builder) => {
        builder
            .addCase(addToCart.fulfilled, (state, action) => {
                console.log(action)
            })
            .addCase(addToCart.rejected, (state, action) => {
                console.log(action)
            })

            .addCase(fetchCartData.fulfilled, (state, action) => {
                state.cart = action.payload
                console.log(action.payload)
            })
            .addCase(fetchCartData.rejected, (state, action) => {
                console.log(action)
            })
    }
    
})
export default cartSlice.reducer