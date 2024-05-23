import {Request, Response, NextFunction} from "express"
import User from "../models/User.js"
import { hash, compare } from "bcrypt";

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try{
        //get all users from db
        const users = await User.find();
        return res.status(200).json({message: "OK", users});
    } catch(error){
        return res.status(500).json({message: "ERROR", cause: error.message})
    }
}

export const userSignup = async (req: Request, res: Response, next: NextFunction) => {
    try{
        //user signup
        const { name, email, password } = req.body;
        const hashedPassword = await hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        return res
        .status(201)
        .json({ message: "OK", name: user.name, email: user.email });
    } catch(error){
        return res.status(500).json({message: "ERROR", cause: error.message})
    }
}