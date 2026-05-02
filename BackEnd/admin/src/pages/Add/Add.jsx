import React, { useState } from "react";
import "./Add.css"
import {assets} from '../../assets/assets'
import upload from '../../assets/upload.png'
import axios from "axios"
const Add=({url})=>{
    const [image,setImage]=useState(false);
    const [data,setData]=useState({
        name:"",
        description:"",
        price:""
    });
    const onChangeHandler=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
        setData(date=>({...data,[name]:value}))
    }

    const onSubmitHandler=async(event)=>{
        event.preventDefault();
        const formData=new FormData();
        formData.append("name",data.name)
        formData.append("description",data.description)
        formData.append("price",Number(data.price))
        formData.append("image",image)
        const response = await axios.post(`${url}/api/food/add`,formData);
        if(response.data.success){
            setData(
                {
                    name:"",
                    description:"",
                    price:""
                }
            )
            setImage(false);
        }else{
            
        }
    }


    return(<div className="add">
    <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col"></div>
        <p>Upload Image</p>
        <label htmlFor="image">
            <img className="upload-img" src={image?URL.createObjectURL(image):upload} alt="upload-area"></img>
        </label>
        <input onClick={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required/>
        <div className="add-product-name flex-col">
        <p>Product Name</p>
        <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder="Type here"/>
        </div>
        <div className="add-product-description flex-col">
            <p>Product Description</p>
        <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder="Write content here" required/>
        </div>
        <div className="add-price flex-col">
            <p>Product Price</p>
            <input onChange={onChangeHandler} value={data.price} type="Number" name="price" placeholder="Rs.60"></input>
        </div>
        <button type="submit" className="add-btn" >ADD</button>
    </form>
</div>)

}

export default Add