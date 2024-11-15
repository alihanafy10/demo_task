import { Router } from "express";
import { auth, authorization, multerMiddleware, validationMiddleware } from "../../Middleware/index.js";
import { profileAuthSchema } from "../auth/auth.validation.js";
import { uploadeImage } from "./upload.controller.js";
import { extention, systemRoles } from "../../Utils/index.js";



export const uploadeRouter=Router()

uploadeRouter.post(
    "/image",
    multerMiddleware({filePath:"image",allowExtention:extention.Images}).single("image"),
    validationMiddleware(profileAuthSchema),
    auth,
    authorization([systemRoles.ADMIN,systemRoles.USER]),
    uploadeImage
  );
