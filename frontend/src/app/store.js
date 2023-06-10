import {configureStore} from '@reduxjs/toolkit'
import authSlice from './features/authSlice'
import cartSlice from './features/cartSlice'
import productSlice from './features/productsSlice'
import categorySlice from './features/categorySlice'
import colorSlice from './features/colorSlice'
import sellerProductSlice from './features/sellerProductSlice'

const store = configureStore({
    reducer: {
        auth: authSlice,
        products: productSlice,
        category: categorySlice,
        color: colorSlice,
        cart: cartSlice,
        sellerProducts: sellerProductSlice,
    }
})

export default store