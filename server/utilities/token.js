import jwt from "jsonwebtoken";

export const generateToken = (id,role) => {
    //sign is an inbuilt func of jwt
    const token = jwt.sign({id:id, role:role ||  'user'}, process.env.JWT_SECRET_KEY);
    return token;
}