import Joi from "joi";
import BaseClass from "../../../common/dto/baseDto.js";

class Login extends BaseClass {
    static schema = Joi.object({
        username: Joi.string()
            .min(3)
            .max(30)
            .trim()
            .required(),

        password: Joi.string()
            .min(6)
            .pattern(/^(?=.*[A-Z])(?=.*\d).+$/)
            .required()
            .messages({
                "string.pattern.base": "Password must contain 1 uppercase and 1 number"
            }),
    });
}

export default Login;