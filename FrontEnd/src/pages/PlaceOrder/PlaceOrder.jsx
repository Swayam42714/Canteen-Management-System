import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"
import { useNavigate } from 'react-router-dom'


const PlaceOrder=()=>{
    const {getTotalCartAmount,token,menulist,cartItems,url}=useContext(StoreContext);
    const [data,setData]=useState({
        firstName:"",
        lastName:"",
        email:""
    })
    const onChangeHandler=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
        setData(data=>({...data,[name]:value}))
    }
    const placeOrder=async(event)=>{
        event.preventDefault();
        let orderItems=[];
        menulist.map((item)=>{
            if(cartItems[item._id]>0){
              let itemInfo=item;
              itemInfo["quantity"]=cartItems[item._id];
              orderItems.push(itemInfo); 
            }
        })
        let orderData={
            items:orderItems,
            amount:getTotalCartAmount(),   
        }
        let response=await axios.post(url+"/api/order/place",orderData,{headers:{token}});
        if(response.data.success){
            const {session_url}=response.data;
            window.location.replace(session_url);
        }else{
            alert("Error");
        }
        alert("Order Placed Successfully");

    }

    const navigate=useNavigate();

    useEffect(()=>{
        if(!token){
            navigate('/cart')
        }else if(getTotalCartAmount()===0){
            navigate('/cart')
        }
    },[token])

    return(
        <form onSubmit={placeOrder} className='place-order'>
            <div className='place-order-left'>
            <p className='title'>Student Information</p>
            <div className='multi-fields'>
                <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type='text' placeholder='First Name'></input>
                <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type='text' placeholder='Last Name'></input>
            </div>
            <input required name='email' onChange={onChangeHandler} value={data.email} type='text' placeholder='Email address'>
            </input>

            </div>
            <div className='place-order-right'>
            <div className="cart-bottom">
                <div className="cart-total">
                    <h2>Cart Total: Rs.{getTotalCartAmount()}</h2>
                </div>
                <button type='submit' >CONFIRM</button>
            </div>
            </div>
        </form>
    )
}
export default PlaceOrder