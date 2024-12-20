

import jwt from 'jsonwebtoken'


import { Token, User } from "../../Database/Model/index.js"
import { AppEroor } from '../Utils/index.js'
import { catchError } from './Error-handdling.middleware.js'

export const auth=catchError(
    async(req,res,next)=>{
        //destructing the token from req
        const token=req.headers.authorization
        
        if(!token)return next(new AppEroor('signin first',400))
    
            //verify token
            if(!token.startsWith('Bearer'))return next(new AppEroor('invalid token',401))
    
                //decode
                const originalToken=token.split(' ')[1]
                let decodeData
                 try{
                    decodeData=jwt.verify(originalToken,process.env.ACCSESS_TOKEN_SECRET)

                 }catch(error){
                    if (error.name === 'TokenExpiredError') {
                        return next(new AppEroor('Token expired, please login again', 401));
                    } else {
                        return next(new AppEroor('invalid token', 401));
                    }
                 }
                if(!decodeData.id)return next(new AppEroor('invalid token',401))

                        
                    //find user
                const user=await User.findById(decodeData.id).select('-password')
                if(!user)return next(new AppEroor('please signup and try to login',400))
                    req.authUser=user
                    next()
                }
)