import mongoose from "mongoose";

export const connectDB= async()=>{
    await mongoose.connect('mongodb+srv://stynpgetgo:4271@cluster0.ktv5x.mongodb.net/cms?retryWrites=true&w=majority&appName=Cluster0').then(()=>console.log("DB connected"));
}