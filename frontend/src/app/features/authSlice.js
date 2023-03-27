import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

// Signup API Request
export const signup = createAsyncThunk('auth/signup', async({enteredData}) => {
    try{
        const res = await axios.post(`/api/accounts/signup/`, enteredData)
        // console.log(res)
        return res.data
    }catch(error){
        console.log(error)
    }
})

// Login API Request
export const login = createAsyncThunk('auth/login', async({enteredData}) => {
    try{
        const res = await axios.post(`/api/accounts/login/`, enteredData)
        // console.log(res)
        return res.data
    }catch(error){
        console.log(error)
    }
})

const initialAuthState = {
    token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
    isAuthenticated: true ? localStorage.getItem('token') : false,
    loading: false
}
const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers:{
        logout(state){
            state.isAuthenticated = false
            localStorage.removeItem('token')
        }
    },
    extraReducers: (builder) => [
        builder
            // Sign up 
            .addCase(signup.pending, (state) => {
                state.loading = true
            })
            .addCase(signup.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(signup.rejected, (state) => {
                state.loading = false
            })

            // Login 
            .addCase(login.pending, (state) => {
                state.loading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false
                state.isAuthenticated = true
                localStorage.setItem('token', action.payload.token.access)
            })
            .addCase(login.rejected, (state) => {
                state.loading = false
            })
    ]

})
export const authActions = authSlice.actions
export default authSlice.reducer
