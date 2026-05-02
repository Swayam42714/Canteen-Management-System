import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

function Cart() {
    const { cartItems, removeFromCart,getTotalCartAmount,url,menulist} = useContext(StoreContext);
    const navigate= useNavigate();
    return (
        <div className="cart">
            <div className="cart-items">
                <div className="cart-items-title">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <hr />
                {menulist.some(item => cartItems[item._id] > 0) ? (
                    menulist.map((item) => {
                        if (cartItems[item._id] > 0) {
                            return (
                                <div key={item._id} className="cart-item">
                                    <div key={item._id} className="cart-items-title cart-items-item">
                                <img src={url+"/images/"+item.image} alt={item.menu_name} />
                                <p>{item.menu_name}</p>
                                <p>Rs.{item.price}</p>
                                <p>{cartItems[item._id]}</p>
                                <p>Rs.{item.price * cartItems[item._id]}</p>
                                <button className="remove" onClick={() => removeFromCart(item._id)}>Remove</button>
                            </div>
                            <hr></hr>
                            </div>
                                
                            
                            );
                        }
                        return null;
                    })
                ) : (
                    <p>Your cart is empty</p>
                )}
            </div>
            <div className="cart-bottom">
                <div className="cart-total">
                    <h2>Cart Total: Rs.{getTotalCartAmount()}</h2>
                </div>
                <button onClick={()=>navigate('/placeorder')}>CONFIRM ORDER</button>
            </div>
        </div>
    );
}

export default Cart;
