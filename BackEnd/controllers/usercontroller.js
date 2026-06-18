import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import validator from "validator"


//Login user
const loginUser=async(req,res)=>{
    const {password}=req.body;
    const email = req.body.email?.trim().toLowerCase();
    try{
        const user=await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"User does not exist"});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({success:false,message:"Invalid Credentials"});
        }
        const token=createToken(user._id);
        res.json({success:true,token})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}
const createToken=(id)=>{
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is missing. Add it to BackEnd/.env");
    }

    return jwt.sign({id},process.env.JWT_SECRET)
}

//register user
const registerUser=async(req,res)=>{
    const {name,password}=req.body;
    const email = req.body.email?.trim().toLowerCase();
    try{
        //checking if user already exists
        const exists= await userModel.findOne({email})
        if(exists){
            return res.json({success:false,message:"User already exists"})
        }
        //validating email format and strong password
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid email"});
        }
        if(password.length<8){
            return res.json({success:false, message: "Please enter a strong password"});
        }
        //hashing user password
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt);
        
        const newUser=new userModel({
            name:name,
            email:email,
            password:hashedPassword
            
        })

        const user=await newUser.save()
        const token=createToken(user._id)
        res.json({success:true,token});
        

    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}
export {loginUser, registerUser}
