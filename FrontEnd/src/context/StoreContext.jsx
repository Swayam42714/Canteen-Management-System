import { createContext, useEffect, useState } from "react";
import axios from "axios"
export const StoreContext= createContext(null)
const StoreContextProvider=(props)=>{

    const [cartItems,setCartItems]=useState({});
    const url="http://localhost:4000"
    const [token,setToken]=useState("");
    const [menulist,setFoodList]=useState([]);
    const addToCart=async(itemId)=>{
        console.log('addtocart');
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }
        else {
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})

        }
    }
    const removeFromCart=async(itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}));
        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    }

    const getTotalCartAmount=()=>{
        let totalAmount=0;
        for(const item in cartItems){
            if(cartItems[item]>0){
            let itemInfo=menulist.find((product)=>product._id=== item);
           totalAmount+=itemInfo.price*cartItems[item];
            }
        }
        return totalAmount;
    }

    const fetchFoodList=async()=>{
        const response=await axios.get(url+"/api/food/list");
        setFoodList(response.data.data);
    }

    const loadCartData = async (authToken) => {
        try {
            const response = await axios.post(url + "/api/cart/get", {}, { headers: { Authorization: `Bearer ${authToken}` } });
            setCartItems(response.data.cartData);
        } catch (error) {
            console.error("Error loading cart data:", error);
        }
    };
    
    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            const savedToken = localStorage.getItem("token");
            if (savedToken) {
                setToken(savedToken);
                await loadCartData(savedToken); // Pass token here
            }
        }
        loadData();
    }, []);
    

    const contextValue={
        menulist,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider