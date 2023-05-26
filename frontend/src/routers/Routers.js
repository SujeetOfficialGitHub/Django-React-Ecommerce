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

const Routers = () => {
  const isLoggedIn = useSelector(state => state.auth.isAuthenticated)
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/product/:slug' element={ <ProductDetail />} />
      <Route path='/cart' element={ <Cart />} />

      <Route path='/add-products' element={isLoggedIn ? <AddProducts/> : <Navigate replace to="/login" />} />
      <Route path='/products-listed' element={isLoggedIn ? <SellerProductListed/> : <Navigate replace to="/login" />} />
      <Route path='/products-listed/:slug' element={isLoggedIn ? <UpdateProduct/> : <Navigate replace to="/login" />} />


      <Route path='/signup' element={!isLoggedIn ? <Signup/> : <Navigate replace to="/" />} />
      <Route path='/login' element={!isLoggedIn ? <Login/> : <Navigate replace to="/" />} />
      <Route path='/change-password' element={isLoggedIn ? <ChangePassword/> : <Navigate replace to="/login" />} />
      <Route path='/profile' element={isLoggedIn ? <Profile/> : <Navigate replace to="/login" />} />
      
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default Routers