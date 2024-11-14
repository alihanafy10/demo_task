import { Router } from "express";
import { logout, profile, signin, signup } from "./auth.controller.js";
import { auth, validationMiddleware } from "../../Middleware/index.js";
import { profileAuthSchema, signinAuthSchema, signupAuthSchema } from "./auth.validation.js";


export const authRouter=Router()

authRouter.post('/signup',validationMiddleware(signupAuthSchema), signup)
authRouter.post('/signin',validationMiddleware(signinAuthSchema), signin)
authRouter.get('/profile',validationMiddleware(profileAuthSchema),auth, profile)
authRouter.post('/logout',validationMiddleware(profileAuthSchema),auth, logout)