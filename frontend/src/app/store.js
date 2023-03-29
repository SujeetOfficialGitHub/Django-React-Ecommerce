import {configureStore} from '@reduxjs/toolkit'
import authSlice from './features/authSlice'
import productSlice from './features/productSlice'

const store = configureStore({
    reducer: {
        auth: authSlice,
        products: productSlice
    }
})

export default store