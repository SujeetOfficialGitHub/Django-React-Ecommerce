import {configureStore} from '@reduxjs/toolkit'
import authSlice from './features/authSlice'
import cartSlice from './features/cartSlice'
import productSlice from './features/productsSlice'
import categorySlice from './features/categorySlice'
import sellerProductSlice from './features/sellerProductSlice'

const store = configureStore({
    reducer: {
        auth: authSlice,
        products: productSlice,
        category: categorySlice,
        cart: cartSlice,
        sellerProducts: sellerProductSlice
    }
})

export default store