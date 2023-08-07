import Joi from "joi";

export default Joi.object({
    email: Joi.string().required().messages({
        "string.empty": "The email field is required.",
    }),
    password: Joi.string().min(6).max(15).required().messages({
        "string.empty": "The password field is required.",
        "string.min": "The password field min 6 characters required.",
        "string.max": "The password field max 15 characters required.",
    }),
});
