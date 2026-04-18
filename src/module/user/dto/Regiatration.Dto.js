import Joi from "joi";
import BaseClass from "../../../common/dto/baseDto.js";

class Register extends BaseClass {
    static schema = Joi.object({
        username: Joi.string()
            .min(3)
            .max(30)
            .trim()
            .required(),

        email: Joi.string()
            .email()
            .lowercase()
            .required(),

        password: Joi.string()
            .min(6)
            .pattern(/^(?=.*[A-Z])(?=.*\d).+$/)
            .required()
            .messages({
                "string.min": "Password must be at least 6 characters",
                "string.pattern.base": "Password must contain at least 1 uppercase letter and 1 number"
            }),

        fullName: Joi.string().max(50).optional(),

        bio: Joi.string().max(150).optional()
    });
}

export default Register;