import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


import { Token, User } from "../../../Database/Model/index.js";
import { catchError } from "../../Middleware/index.js";
import { AppEroor } from "../../Utils/AppError.utils.js";



/**
 * signup method
 * @throws {400} - if phone already exists
 * @returns {userData}
 */
export const signup=catchError(async(req,res,next)=>{
//chick if phone number exists
const phoneExists=await User.findOne({phone:req.body.phone})
if(phoneExists)  return next(new AppEroor("phone alrady exists",400));
   
//create user
const userData=await User.create(req.body)

//ignore password
userData.password=undefined

res.status(201).json({message:"register successfully",data:userData})
});

/**
 * signin method
 * @throws {401} - if phone or password is incorrect
 * @returns {access_token,refresh_token}
 */
export const signin=catchError(async(req,res,next)=>{
    //chick if phone number exists
    const user=await User.findOne({phone:req.body.phone})
    if(!user)  return next(new AppEroor("phone or password is incorrect",401));
    
    //compare password
    const isMatch=await bcrypt.compare(req.body.password,user.password)
    if(!isMatch)  return next(new AppEroor("phone or password is incorrect",401));
    
    //generate access token
    const access_token=jwt.sign({id:user._id},process.env.ACCSESS_TOKEN_SECRET,{expiresIn:"8h"})

    //generate refresh token
    const refresh_token=jwt.sign({id:user._id},process.env.REFRESH_TOKEN_SECRET)
    
    //save refresh token to database
    await Token.create({refreshToken:refresh_token,userId:user._id})
    
    res.json({message:"login successfully",access_token,refresh_token})
})


/**
 * @throws {invalid token,401}
 * @returns {user}
 */
export const profile=catchError(async(req, res, next)=>{
    //get user from token
    const token=req.headers.token.split(' ')[1]
    
    //verify access token and featch id
    const {id}=jwt.verify(token,process.env.ACCSESS_TOKEN_SECRET)

    //get user data
    const user=await User.findById(id)
    
    if(!user)  return next(new AppEroor("invalid token",401));
    
    //ignore password
    user.password=undefined
    
    res.json({message:"get profile successfully",data:user})
})

export const logout=catchError(async(req,res,next)=>{
    //get user from token
    const token=req.headers.token.split(' ')[1]
    
    //verify access token and featch id
    const {id}=jwt.verify(token,process.env.ACCSESS_TOKEN_SECRET)

    //delete refresh token
    await Token.deleteOne({userId:id})
    
    res.json({message:"logout successfully"})
})

