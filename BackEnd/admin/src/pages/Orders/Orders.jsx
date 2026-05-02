import React, { useEffect, useState } from "react";
import "./Orders.css";
import axios from "axios";
import { assets } from "../../assets/assets";

const Orders = ({ url }) => {
    const [orders, setOrders] = useState([]);

    const fetchAllOrders = async () => {
        try {
            const response = await axios.get(url + "/api/order/list");
            if (response.data.success) {
                setOrders(response.data.data);
                console.log(response.data.data);
            } else {
                console.error("Failed to fetch orders");
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    const statusHandler=async(event,orderId)=>{
        const response=await axios.post(url+"/api/order/status",{
            orderId,
            status:event.target.value,      
        })
        if(response.data.success){
            await fetchAllOrders();
        }
    }

    useEffect(() => {
        fetchAllOrders();
    }, []);

    return (
        <div className="order add">
            <h3>Order Page</h3>
            <div className="order-list">
                {orders.map((order, index) => (
                    <div key={index} className="order-item">
                        <img src={assets.cat} alt="food" />
                        <div>
                            <p className="order-item-food">
                                {order.items
                                    .map((item) => `${item.name} x ${item.quantity}`)
                                    .join(", ")}
                            </p>
                            <p className="order-item-name">{order.firstname+" "+order.lastname}</p>
                            <p>Items:{order.items.length}</p>
                            <p>${order.amount}</p>
                            <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
                                <option value="Food Processing">Food Processing</option>
                                <option value="Ready">Ready</option>
                                <option value="Delivered">Delivered</option>
                            </select>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;
