import { Router } from "express";
import { logout, profile, refreshToken, signin, signup } from "./auth.controller.js";
import { auth, authorization, validationMiddleware } from "../../Middleware/index.js";
import { logoutAuthSchema, profileAuthSchema, signinAuthSchema, signupAuthSchema } from "./auth.validation.js";
import { systemRoles } from "../../Utils/index.js";


export const authRouter=Router()

authRouter.post('/signup',validationMiddleware(signupAuthSchema), signup)
authRouter.post('/signin',validationMiddleware(signinAuthSchema), signin)
authRouter.get('/profile',validationMiddleware(profileAuthSchema),auth,authorization([systemRoles.ADMIN,systemRoles.USER]), profile)
authRouter.post('/logout',validationMiddleware(logoutAuthSchema),auth,authorization([systemRoles.ADMIN,systemRoles.USER]), logout)
authRouter.get('/refreshToken',validationMiddleware(profileAuthSchema), refreshToken)
