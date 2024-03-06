import { Router } from "express";
import { forgotPass, login, logout, register, renderRegisterForm, renderSigninForm, resetPass } from "../controllers/auth.controller.js";

const AuthRouter = Router()

AuthRouter.get('/register', renderRegisterForm)
AuthRouter.post('/register', register)
AuthRouter.get('/login', renderSigninForm)
AuthRouter.post('/login', login)
AuthRouter.get('/logout', logout)
AuthRouter.post('/forgotpass', forgotPass)
AuthRouter.post('/resetpass', resetPass)

export default AuthRouter