import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchAllCategory = createAsyncThunk('category/fetchAllCategory', async() => {
    try{
        const res = await axios('/api/categories/');
        return res.data
    }catch(error){
        console.log(error)
    }
});

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        categoryList: [],
        loading: 'false'
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllCategory.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchAllCategory.fulfilled, (state, action) => {
                state.loading = false
                state.categoryList = action.payload
            })
            .addCase(fetchAllCategory.rejected, (state) => {
                state.loading = false
            })
    }
})

export default categorySlice.reducer