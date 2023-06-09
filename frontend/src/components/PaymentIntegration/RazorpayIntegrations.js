import React from "react";
import axios from "axios";
import ButtonBox from '../ui/ButtonBox'
import { useDispatch, useSelector } from "react-redux";
import { fetchCartData } from "../../app/features/cartSlice";
import {useNavigate} from 'react-router-dom'

const RazorpayIntegrations = ({cart, totalAmount}) => {
    const email = useSelector(state => state.auth.email)
    const token = useSelector(state => state.auth.token)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handlePaymentSuccess = async (response) => {
        try {
          let bodyData = new FormData();
    
          // we will send the response we've got from razorpay to the backend to validate the payment
          bodyData.append("response", JSON.stringify(response));
    
          await axios({
            url: `api/payment/success/`,
            method: "POST",
            data: bodyData,
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
          })
            .then((res) => {
              console.log("Everything is OK!");
              dispatch(fetchCartData({token}))
              navigate('/orders')

            })
            .catch((err) => {
              console.log(err);
            });
        } catch (error) {
          console.log(console.error());
        }
      };
    
      // this will load a script tag which will open up Razorpay payment card to make //transactions
  const loadScript = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(script);
  };

  const showRazorpay = async () => {
    const res = await loadScript();

    let bodyData = new FormData();

    // we will pass the amount and product name to the backend using form data
    bodyData.append("amount", totalAmount.toString());
    bodyData.append('cart', JSON.stringify(cart))

    const data = await axios({
      url: `/api/payment/pay/`,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      },
      data: bodyData,
    }).then((res) => {
      return res;
    });

    // in data we will receive an object from the backend with the information about the payment
    //that has been made by the user

    var options = {
      key_id: process.env.REACT_APP_PUBLIC_KEY,
      key_secret: process.env.REACT_APP_SECRET_KEY,
      amount: data.data.payment.amount,
      currency: "INR",
      name: email,
      description: "Test teansaction",
      image: "", // add image url
      order_id: data.data.payment.id,
      handler: function (response) {
        // we will handle success by calling handlePaymentSuccess method and
        // will pass the response that we've got from razorpay
        handlePaymentSuccess(response);
      },
      prefill: {
        name: "User's name",
        email: email,
        contact: "User's phone",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };



  return (
    <ButtonBox onClick={showRazorpay}>Proceed To Pay</ButtonBox>
  )
}

export default RazorpayIntegrations