import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxLength:50
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minLength:3,
        maxLength:30
    },
    role:{
        type:String,
        enum:["admin","restaurant"]
    },
    password:{
        type:String,
        required:true,
        minLength:6,
    },
    // profilepic:{
    //     type:String,
    //     // image not store dirct to db, we can use cloudinary like platform to store images. and which give 
    //     //corresponding url string to store into db.
    //     default:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png"
    // }

  },
  {timestamps:true},
);
export const Admin = mongoose.model("Admin",adminSchema);