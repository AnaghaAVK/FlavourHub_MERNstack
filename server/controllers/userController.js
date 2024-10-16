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
         
        const saltRound = 10
        const hashedPassword = bcrypt.hashSync(password,saltRound);
        //console.log(hashedPassword,"hashedPassword");
        

        const newUser = new User({
            name,email,password:hashedPassword,mobile,profilepic
        })

        const savedUser = await newUser.save();


        const token = await generateToken(savedUser._id);
        res.cookie("token",token)
        return res.status(200).json({message:"User registration Successgull"});
      

    } catch (error) {
        res.status(error.status || 500).json({error:error.message || "Internal Server Error"})
    }
};

//Login

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "all fields are required" });
        }

        const userExist = await User.findOne({ email });
        if (!userExist) {
            return res.status(404).json({ success: false, message: "user does not exist" });
        }

        const passwordMatch = bcrypt.compareSync(password, userExist.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "user not autherized" });
        }

        const token = generateToken(userExist._id);

        res.cookie("token", token);
        res.json({ success: true, message: "user login successfull" });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json(error.message || 'Internal server error')
    }
};

//user profile

export const userProfile = async (req, res, next) => {
    try {

        const {user}=req

        const userData = await User.findById(user.id).select('-password')

        res.json({ success: true, message: "user profile fetched", userData });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json(error.message || 'Internal server error')
    }
};

//user Logout
export const userLogout = async (req, res, next) => {
    try {

        res.clearCookie('token')
        res.json({ success: true, message: "user logged out" });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json(error.message || 'Internal server error')
    }
};

//check user
export const checkUser = async (req, res, next) => {
    try {

        res.json({ success: true, message: "autherized user" });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json(error.message || 'Internal server error')
    }
};