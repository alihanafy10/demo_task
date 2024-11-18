
import { AppEroor } from "../Utils/index.js";
import { catchError } from "./Error-handdling.middleware.js";


export const authorization=(allowedRules)=>{
    return catchError(
        async(req,res,next) => {
            const user=req.authUser.role
            if(!allowedRules.includes(user))
                return next(new AppEroor('Authrization Error',403,'you are not allowed to access this route'))
            next()
        }
    )
}