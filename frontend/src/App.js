import React, { useEffect } from 'react';
import './App.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Routers from './routers/Routers';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartData } from './app/features/cartSlice';


function App() {

  const token = useSelector(state => state.auth.token)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchCartData({token}))
  }, [dispatch, token])
  return (
    <>
   
    <Header />
    <main>
      <Routers />
    </main>
    <Footer />
    </>
  );
}

export default App;
