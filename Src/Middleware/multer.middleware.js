import multer from 'multer'
import path from 'path'
import { v4 as uuidv4 } from "uuid";
import fs from 'fs'
import { AppEroor } from '../Utils/index.js';
export const multerMiddleware = ({ filePath = "general" ,allowExtention} = {}) => {
    const destinationPath = path.resolve(`src/uploads/${filePath}`)
    
    if (!fs.existsSync(destinationPath)) {
        fs.mkdirSync(destinationPath,{recursive: true})
    }

    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, destinationPath);
      },
      filename: (req, file, cb) => {
        cb(null, uuidv4() + "-" + file.originalname);
      },
    });

    const fileFilter = (req, file, cb) => {
      if(allowExtention.includes(file.mimetype)){
        return cb(null,true)
      }

      cb(new AppEroor("invalid file type",400),false)
    }
    const file = multer({fileFilter, storage });
    return file;
}