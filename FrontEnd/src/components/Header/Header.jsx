import React from "react"
import './Header.css'
import momo from './momo.jpg'
function Header(){
    return(<div className="header">
        <div className="header-contents">
            <div className="header-contents-left">
                <h1>ENJOY YOUR HEALTHY DELICIOUS FOOD</h1>
                <p>Get quality food fast and easy</p>
                <button>Menu</button>
            </div>
            <div className="header-contents-right">
                <img src={momo} alt="imghere"></img>
            </div>
        </div>
    </div>)
}
export default Header