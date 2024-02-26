import { Router } from "express";
import { logOut, login, profile, register } from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middlewares.js";
import { registerSchema, loginSchema } from "../schemas/auth.schemas.js" 

const AuthRouter = Router()

AuthRouter.post('/register', validateSchema(registerSchema) ,register)
AuthRouter.post('/login', validateSchema(loginSchema), login)
AuthRouter.post('/logout', logOut)
AuthRouter.get('/profile', authRequired, profile)

export default AuthRouter