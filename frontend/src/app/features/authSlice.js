import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

// Seller Signup API Request
export const sellerSignup = createAsyncThunk('auth/sellerSignup', async({enteredData} ,{rejectWithValue}) => {
    try{
        const res = await axios.post(`/api/seller/signup/`, enteredData)
        return res.data
    } catch(error){
        console.log(error)
        return rejectWithValue(error.response.data.errors)

    }
})

// Signup API Request
export const signup = createAsyncThunk('auth/signup', async({enteredData} ,{rejectWithValue}) => {
    try{
        const res = await axios.post(`/api/accounts/signup/`, enteredData)
        // console.log(res)
        return res.data
    } catch(error){
        console.log(error)
        return rejectWithValue(error.response.data.errors)

    }
})

// Login API Request
export const login = createAsyncThunk('auth/login', async({enteredData},{rejectWithValue}) => {
    try{
        const res = await axios.post(`/api/accounts/login/`, enteredData)
        // console.log(res)
        return res.data
    } catch(error){
        console.log(error)
        return rejectWithValue(error.response.data.errors)

    }
})

// Change Password API Request
export const changePassword = createAsyncThunk('auth/changePassword', async({token, enteredData}, {rejectWithValue}) => {
    try{
        const res = await axios.post(`/api/accounts/change-password/`, enteredData, {
        headers: {
            'Authorization': `Bearer ${token}`
          },
        })
        // console.log(res)
        return res.data
    }catch(error){
        console.log(error)
        return rejectWithValue(error.response.data.errors)
    }
})



const initialAuthState = {
    token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
    email: localStorage.getItem('email') ? localStorage.getItem('email') : '',
    isAuthenticated: true ? localStorage.getItem('token') : false,
    loading: false,
    message: '',
    error: null,
    is_seller: true ? localStorage.getItem('seller') : false,
}
const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers:{
        logout(state){
            state.isAuthenticated = false
            localStorage.removeItem('token')
            localStorage.removeItem('seller')
            localStorage.removeItem('email')
        }
    },
    extraReducers: (builder) => [
        builder
            // Seller Sign up 
            .addCase(sellerSignup.pending, (state) => {
                state.loading = true
            })
            .addCase(sellerSignup.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(sellerSignup.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                // console.log(action)
            })

            // Sign up 
            .addCase(signup.pending, (state) => {
                state.loading = true
            })
            .addCase(signup.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                // console.log(action)
            })

            // Login 
            .addCase(login.pending, (state) => {
                state.loading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false
                state.isAuthenticated = true
                state.is_seller = action.payload.seller
                state.email = action.payload.email
                state.token = action.payload.token.access;
                localStorage.setItem('seller', action.payload.seller)
                localStorage.setItem('token', action.payload.token.access)
                localStorage.setItem('email', action.payload.email)
            })
            .addCase(login.rejected, (state,action) => {
                state.loading = false
                state.error =   action.payload
                // console.log(action)
            })

            // Change Password 
            .addCase(changePassword.pending, (state) => {
                state.loading = true
            })
            .addCase(changePassword.fulfilled, (state, action) => {
                state.loading = false
                state.message = action.payload.message
                // console.log(action.payload.message)
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.loading = false
                // console.log(action)
            })

    ]

})
export const authActions = authSlice.actions
export default authSlice.reducer
