import React, {useEffect } from 'react';
import './App.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Routers from './routers/Routers';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartData } from './app/features/cartSlice';
import { decodeToken } from 'react-jwt';
import { authActions } from './app/features/authSlice';

function App() {
    const token = useSelector(state => state.auth.token)
    const dispatch = useDispatch()

    // Auto logout when token is expired 
    useEffect(() => {
        const checkTokenExpiration = () => {
            if (isTokenExpired(token)) {
                dispatch(authActions.logout());
            }
        };

        const expirationCheckInterval = setInterval(checkTokenExpiration, 1000);

        return () => {
        clearInterval(expirationCheckInterval);
        };
    }, [dispatch, token]);

    const isTokenExpired = (token) => {
        if (!token) return true;

        const decodedToken = decodeToken(token);
        const currentTime = Math.floor(Date.now() / 1000); // Convert current time to seconds

        return decodedToken.exp < currentTime;
    };

    useEffect(() => {
        if (token){
            dispatch(fetchCartData({token}))
        }
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
