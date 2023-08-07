import Joi from "joi";

export default Joi.object({
    email: Joi.string().required().messages({
        "string.empty": "The email field is required.",
    }),
    otp: Joi.number().required().messages({
        "number.empty": "The otp field is required.",
    }),
    password: Joi.string().optional().messages({
        "number.empty": "The password field is required.",
    }),
});
