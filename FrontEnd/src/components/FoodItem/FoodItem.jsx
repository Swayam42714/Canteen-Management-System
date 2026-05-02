import './FoodItem.css'
import React, { useContext } from 'react'
import addIcon from './add-icon.png'
import remove from './removeIcon.png'
import { StoreContext } from '../../context/StoreContext';

function FoodItem({id, name, price, description, image}) {
    const { cartItems, addToCart, removeFromCart,url} = useContext(StoreContext);

    return (
        <div className='food-item'>
            <div className="food-item-img-container">
                <img src={url+"/images/"+image} alt={name} className="food-item-image"/>
                {!cartItems[id] ? (
                    <img className="add-icon" onClick={() => addToCart(id)} src={addIcon} alt="Add"></img>
                ) : (
                    <div className='food-item-counter'>
                        <img className="add-del-icon" onClick={() => removeFromCart(id)} src={remove} alt="Remove"></img>
                        <p>{cartItems[id]}</p>
                        <img className="add-del-icon" onClick={() => addToCart(id)} src={addIcon} alt="Add"></img>
                    </div>
                )}
            </div>
            <div className="food-item-info">
                <div className="food-item-name">
                    <p>{name}</p>
                </div>
                <p className="food-item-desc">{description}</p>
                <p className="food-item-price">${price}</p>
            </div>
        </div>
    );
}

export default FoodItem;
