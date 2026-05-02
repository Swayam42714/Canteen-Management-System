import React, { useState } from "react"
import Navbar from "./components/Navbar/Navbar"
import Cart from "./pages/Cart/Cart"
import Home from "./pages/Home/Home"
import { Route, Routes } from "react-router-dom"
import Footer from "./components/Footer/Footer"
import LoginPopup from "./components/LoginPopup/LoginPopup"
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder"
import MyOrders from "./pages/MyOrders/MyOrders"

function App(){
  const [showLogin,setShowLogin]=useState(false);
  return (
  <>
  {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
  <div className="app">
    <Navbar setShowLogin={setShowLogin}/>
    <Routes>
      <Route path="/" element={<Home></Home>}/>
      <Route path="/cart" element={<Cart></Cart>}/>
      <Route path="/placeorder" element={<PlaceOrder></PlaceOrder>}/>
      <Route path="/myorders" element={<MyOrders></MyOrders>}/>
    </Routes>
  </div>
  <Footer/>  
  </>
)
}
export default App