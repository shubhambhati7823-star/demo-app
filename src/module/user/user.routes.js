import { Router } from "express";
import validate from "../../common/middleware/validate.middleware.js";
import Register from "./dto/Regiatration.Dto.js";
import login from "./dto/Login.Dto.js";
import * as authController from "./user.controller.js"
import Login from "./dto/Login.Dto.js";
import authentication from "./user.middleware.js";

const authRouter = Router()


authRouter.post('/registration', validate(Register), authController.register)
authRouter.post('/login', validate(Login), authController.login)
authRouter.post('/logout',authentication, authController.logout)

export default authRouter
