import React from 'react'
import { useSelector } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../pages/home/Home'
import Login from '../pages/login/Login'
import Signup from '../pages/signup/Signup'
import ChangePassword from '../pages/change_password/ChangePassword'
import Profile from '../pages/profile/Profile'
import NotFound from '../pages/NotFound'
import ProductDetail from '../pages/product_detail/ProductDetail'
import Cart from '../pages/cart/Cart'
import AddProducts from '../pages/addProducts/AddProducts'
import SellerProductListed from '../pages/seller_product_list/SellerProductListed'
import UpdateProduct from '../pages/updateProducts/UpdateProducts'
import SellerSignup from '../pages/seller_signup/SellerSignup'
import OrderedProduct from '../pages/ordered_product/OrderedProduct'

const Routers = () => {
  const {isAuthenticated, is_seller} = useSelector(state => state.auth)
  return (
    <Routes>
      <Route path='/' element={isAuthenticated ? <Home /> : <Login/>} />
      <Route path='/product/:slug' element={ <ProductDetail />} />
      <Route path='/cart' element={ isAuthenticated ? <Cart /> : <Login/>} />
      <Route path='/orders' element={ isAuthenticated ? <OrderedProduct /> : <Login/>} />
      
      {isAuthenticated && is_seller && 
        <Route path='/add-products' element={<AddProducts/>} />
      }
      {isAuthenticated && is_seller && 
        <Route path='/products-listed' element={<SellerProductListed/>} />
      }
      {isAuthenticated && is_seller && 
        <Route path='/products-listed/:slug' element={<UpdateProduct/>} />
      }



      <Route path='/seller/signup' element={!isAuthenticated ? <SellerSignup/> : <Navigate replace to="/" />} />

      <Route path='/signup' element={!isAuthenticated ? <Signup/> : <Navigate replace to="/" />} />
      <Route path='/login' element={!isAuthenticated ? <Login/> : <Navigate replace to="/" />} />
      <Route path='/change-password' element={isAuthenticated ? <ChangePassword/> : <Navigate replace to="/login" />} />
      <Route path='/profile' element={isAuthenticated ? <Profile/> : <Navigate replace to="/login" />} />
      
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default Routers