import React, { useContext, useState } from "react"
import './Navbar.css'
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

function Navbar({ setShowLogin }) {
    const [menu, setMenu] = useState("home");
    const { token, setToken } = useContext(StoreContext);
    const navigate = useNavigate();  // Fixed here

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
    }

    return (
        <div className="navbar">
            <Link to='/'><p>CanteenCraft<span>.</span></p></Link>
            <ul className="navbar-menu">
                <Link to='/'><li onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</li></Link>
                <li onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</li>
                <li onClick={() => setMenu("contact")} className={menu === "contact" ? "active" : ""}>Contact Us</li>
            </ul>
            <div className="navbar-right">
                <Link to='/cart'><button>Cart</button></Link>
                {!token ? (
                    <button onClick={() => setShowLogin(true)}>Sign In</button>
                ) : (
                    <div className="navbar-profile">
                        <img src="profile_image_url" alt="profile" />
                        <ul className="navbar-profile-dropdown">
                            <li onClick={() => navigate('/myorders')}><img src="bag_icon_url" alt="bag-icon" /><p>Orders</p></li>
                            <hr />
                            <li onClick={logout}><img src="logout_icon_url" alt="logout-icon" /><p>Logout</p></li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navbar;
