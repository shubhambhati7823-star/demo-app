import { Router } from "express";
import validate from "../../common/middleware/validate.middleware.js";
import Register from "./dto/Regiatration.Dto.js";
import Login from "./dto/Login.Dto.js";
import authController from "./user.controller.js";
import authentication from "./user.middleware.js";

const router=Router()


router.post('/registration',validate(Register),authController.register)
router.post('/login',validate(Login),authController.login)
router.post('/logout',authentication,authController.logout)

export default router