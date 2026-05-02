import React from "react";
import './Navbar.css'
import {assets} from '../../assets/assets'
const Navbar=()=>{
    return(<div className="navbar">
    <p>CanteenCraft<span>.</span></p>
    <img className='profile' src={assets.cat} alt="profile" />
    </div>)
}
export default Navbar