import Joi from "@hapi/joi";

export const loginModel = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})