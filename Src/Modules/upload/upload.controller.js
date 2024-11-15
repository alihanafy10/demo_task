import path from "path";

import { catchError } from "../../Middleware/index.js";

export const uploadeImage=catchError(async(req,res,next)=>{
    const imagePath=path.resolve("Src/uploads/image")+'/'+req.file.filename
    res.status(201).json({message:"uploade image successfully",image:imagePath})
})