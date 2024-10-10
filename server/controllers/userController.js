import {User} from "../models/userModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utilities/token.js";
import { trusted } from "mongoose";

//Sign-up
export const create = async (req,res,next)=>
{
    try {
        const {name,email,password,mobile,profilepic} = req.body;

        if(!name || !email || !password || !mobile){
          return  res.status(400).json({message:"All fields required"})
        }
        const userAlreadyExist = await User.findOne({email})
        // console.log(userAlreadyExist,"");

        if(userAlreadyExist){
            return  res.status(400).json({message:"User already exist"})
        }

        //password hashing, befr storing into db, using bcript
         
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        //console.log(hashedPassword,"hashedPassword");
        

        const newUser = new User({
            name,email,password:hashedPassword,mobile
        })

        const savedUser = await newUser.save()
        if(savedUser){
            const token = await generateToken(savedUser._id)
            res.cookie("token",token)
            return res.status(200).json({message:"User registration Successgull",savedUser})
        }
       return res.status(400).json({error: "Somthing went wrong"})

    } catch (error) {
        res.status(error.status || 500).json({error:error.message || "Internal Server Error"})
    }
}

//Login

export const login = async(req,res,next) =>{
    try {
        const {email,password} = req.body
        if(!email || !password){
            return  res.status(400).json({message:"All fields required"})
        }
        const userExist = await User.findOne({email})

        if(!userExist){
            return res.status(400).json({error: "User does't exist"})
        }

        const passwordMatch = await bcrypt.compare(password,userExist.password)
         if(!passwordMatch){
            return res.status(400).json({error: "Password does't match"})
        }
        const token = await generateToken(userExist._id)
        res.cookie("token",token)
        res.status(200).json({message:"Login Successfull"})


    } catch (error) {
        res.status(error.status || 500).json({error:error.message || "Internal Server Error"})
    }
}