import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

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

// Login API Request
export const changePassword = createAsyncThunk('auth/changePassword', async({token, enteredData}) => {
        const res = await axios.post(`/api/accounts/change-password/`, enteredData, {
        headers: {
            'Authorization': `Bearer ${token}`
          },
        })
        // console.log(res)
        return res.data
})

const initialAuthState = {
    token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
    isAuthenticated: true ? localStorage.getItem('token') : false,
    loading: false,
    message: '',
    error: null
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
                localStorage.setItem('token', action.payload.token.access)
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
                console.log(action.payload.message)
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.loading = false
                // console.log(action)
            })
    ]

})
export const authActions = authSlice.actions
export default authSlice.reducer
