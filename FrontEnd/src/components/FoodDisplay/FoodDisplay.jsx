import React, { useContext } from "react"
import './FoodDisplay.css'
import { StoreContext } from "../../context/StoreContext"
import FoodItem from "../FoodItem/FoodItem"
// import { menulist } from "../../assets/assets"
function FoodDisplay(){
    const {menulist}=useContext(StoreContext);
    return (<div className="food-display" id="food-display">
        <div className="food-display-list">
            {menulist.map((item,index)=>{
                return(<FoodItem key={index} id={item._id} name={item.menu_name} description={item.description} price={item.price} image={item.image}/>)
            })}
        </div>
    </div>)
}
export default FoodDisplay