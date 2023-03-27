import React from 'react'
import { useSelector } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../pages/home/Home'
import Login from '../pages/login/Login'
import Signup from '../pages/signup/Signup'
import ChangePassword from '../pages/change_password/ChangePassword'

const Routers = () => {
  const isLoggedIn = useSelector(state => state.auth.isAuthenticated)
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/signup' element={!isLoggedIn ? <Signup/> : <Navigate replace to="/" />} />
      <Route path='/login' element={!isLoggedIn ? <Login/> : <Navigate replace to="/" />} />
      <Route path='/change-password' element={isLoggedIn ? <ChangePassword/> : <Navigate replace to="/login" />} />
    </Routes>
  )
}

export default Routers