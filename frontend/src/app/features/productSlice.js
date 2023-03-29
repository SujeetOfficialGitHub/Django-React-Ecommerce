import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllProducts = createAsyncThunk('products', async() => {
        const res = await axios.get(`https://dummyjson.com/products/`)
        return res.data.products

})

const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        loading: false
    },
    extraReducers: (builder) => {
        builder

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
    }
})

export default productSlice.reducer