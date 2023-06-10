import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchAllColor = createAsyncThunk('category/fetchAllColor', async() => {
    try{
        const res = await axios('/api/colors/');
        return res.data
    }catch(error){
        console.log(error)
    }
});

const colorSlice = createSlice({
    name: 'category',
    initialState: {
        colorsList: [],
        loading: 'false'
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllColor.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchAllColor.fulfilled, (state, action) => {
                state.loading = false
                state.colorsList = action.payload
            })
            .addCase(fetchAllColor.rejected, (state) => {
                state.loading = false
            })
    }
})

export default colorSlice.reducer