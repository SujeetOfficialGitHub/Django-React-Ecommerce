import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

export const addToCart = createAsyncThunk('cart/addToCart', async({item, token},{rejectWithValue}) => {
    try{
        const res = await axios.post(`/api/cart/`, item, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
        return res.data
    }catch(error){
        return rejectWithValue(error.response.data.errors)
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
        return res.data
    }catch(error){
        return rejectWithValue(error.response.data.errors)
    }
})

export const deleteCartData = createAsyncThunk('cart/deleteCartData', async({token, id},{rejectWithValue}) => {
    try{
        const res = await axios.delete(`/api/cart/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        return {...res.data.cart, id: id}
    }catch(error){
        return rejectWithValue(error.response.data.errors)
    }
})

export const updateCartData = createAsyncThunk('cart/updateCartData', async({token, id, quantity},{rejectWithValue}) => {
    try{

        const res = await axios.put(`/api/cart/${id}/`,{ quantity}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        return {...res.data.cart, id: id, updateNumber: quantity}
    }catch(error){
        return rejectWithValue(error.response.data.errors)
    }
})

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
        totalAmount: 0,
        loading: false
    },
    extraReducers: (builder) => {
        builder
            // Add to Cart 
            .addCase(addToCart.fulfilled, (state, action) => {
                console.log('Item added')
            })
            .addCase(addToCart.rejected, (state, action) => {
                console.log(action)
            })

            // Fetch all cart data 
            .addCase(fetchCartData.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchCartData.fulfilled, (state, action) => {
                state.loading = false
                state.cart =  action.payload.length>0 ? action.payload[0].cart_items : action.payload
                state.totalAmount = action.payload.length>0 ? action.payload[0].total_amt : 0;
            })
            .addCase(fetchCartData.rejected, (state, action) => {
                state.loading = false
                console.log(action)
            })
           
            // Delete cart data 
            .addCase(deleteCartData.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteCartData.fulfilled, (state, action) => {
                state.loading = false
                state.totalAmount = state.totalAmount - action.payload.selling_price * action.payload.quantity
                state.cart = state.cart.filter(item => item.id !== action.payload.id)
            })
            .addCase(deleteCartData.rejected, (state, action) => {
                state.loading = false

            })
          
            // update cart data 
            .addCase(updateCartData.pending, (state) => {
                state.loading = true
            })
            .addCase(updateCartData.fulfilled, (state, action) => {
                state.loading = false
                state.totalAmount = state.totalAmount + (action.payload.selling_price * action.payload.updateNumber)
                const index = state.cart.findIndex((item) => item.id === action.payload.id);
                if (state.cart[index].quantity === 1 && action.payload.quantity === 0){
                    state.cart = state.cart.filter(item => item.id !== action.payload.id)
                }else{
                    state.cart[index] = action.payload
                }
            })
            .addCase(updateCartData.rejected, (state, action) => {
                state.loading = false
                console.log(action)

            })
           

    }
    
})
export default cartSlice.reducer