import bcrypt from 'bcrypt'
import { generateToken } from '../utilities/token.js';
import { Admin } from '../models/adminModel.js';

export const adminSignup = async (req, res, next) => {
    try {
        const { name, email, password, mobile, profilePic } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields required" });
        }
        const isAdminExist = await Admin.findOne({ email });

        if (isAdminExist) {
            return res.status(400).json({ message: "Admin already exist" });
        }

        const saltRounds = 10;
        const hashedPassword = bcrypt.hashSync(password, saltRounds);

        const newAdmin = new Admin({ name, email, password: hashedPassword, mobile, profilePic });
        await newAdmin.save();

        const token = generateToken(newAdmin._id,'admin');

        res.cookie("token", token);

        res.json({ success: true, message: "Admin account created successfully" });
    } catch (error) {
        console.log(error);
    res.status(error.statusCode || 500).json(error.message || 'Internal server error')        
    }
};

export const adminLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const isAdminExist = await Admin.findOne({ email });
        if (!isAdminExist) {
            return res.status(404).json({ success: false, message: "Admin does not exist" });
        }

        const passwordMatch = bcrypt.compareSync(password, isAdminExist.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Admin not autherized" });
        }

        const token = generateToken(isAdminExist._id,'admin');

        res.cookie("token", token);
        res.json({ success: true, message: "Admin login successfull" });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json(error.message || 'Internal server error')
    }
};


export const adminProfile = async (req, res, next) => {
    try {

        const {user}=req

        const userData = await Admin.findById(user.id).select('-password')

        res.json({ success: true, message: "user profile fetched", userData });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json(error.message || 'Internal server error')
    }
};
export const adminLogout = async (req, res, next) => {
    try {

        res.clearCookie('token')
        res.json({ success: true, message: "user logged out" });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json(error.message || 'Internal server error')
    }
};
export const checkAdmin = async (req, res, next) => {
    try {

        res.json({ success: true, message: "Admin autherized" });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json(error.message || 'Internal server error')
    }
};
