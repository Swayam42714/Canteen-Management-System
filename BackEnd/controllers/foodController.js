import foodModel from "../models/foodModel.js";
import fs from 'fs'
import mongoose from 'mongoose';


//add food item

const addFood=async(req,res)=>{
    let image_filename=`${req.file.filename}`;
    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        image:image_filename
    })
    try{
        await food.save();
        res.json({success:true,message:"Food Added"})
    }catch(error){
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

//all food list
const listFood=async(req,res)=>{
    try{
        const foods=await foodModel.find({});
        res.json({success:true,data:foods})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//remove food item

const removeFood = async (req, res) => {

    try {
        console.log("Request Body:", req.body);
        
        if (!req.body.id) {
            return res.status(400).json({ success: false, message: "ID is required" });
        }

        const foodId = new mongoose.Types.ObjectId(req.body.id);
        const food = await foodModel.findById(foodId);

        if (!food) {
            return res.status(404).json({ success: false, message: "Food not found" });
        }

        if (food.image) {
            fs.unlink(`uploads/${food.image}`, (err) => {
                if (err) console.log("File deletion error:", err);
            });
        }

        await foodModel.findByIdAndDelete(foodId);
        res.json({ success: true, message: "Food Removed" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error", error: error.message });
    }
};



export {addFood,listFood,removeFood}