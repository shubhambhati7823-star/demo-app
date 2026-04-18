import Joi from "joi";

class BaseClass {
    static schema = Joi.object({});

    static validate(data) {
        const { error, value } = this.schema.validate(data, {
            abortEarly: false,
            stripUnknown: true
        });

        if (error) {
            const errorMessage = error.details
                .map(d => d.message)
                .join(", ");

            return {
                error: true,
                message: errorMessage,
                data: null
            };
        }

        return {
            error: false,
            message: "Validation success",
            data: value
        };
    }
}

export default BaseClass;