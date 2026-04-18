import Joi from "joi"


class StatusDto extends BaseDto{
    static schema = Joi.object({
        caption: Joi.string()
    })
}

export default StatusDto;