import Joi from "joi";

export default Joi.object({
    name: Joi.string().required().messages({
        "string.empty": "The name field is required.",
    }),
    email: Joi.string().email().optional().messages({
        "string.empty": "The email field is required.",
        "string.email": "The email must be a valid email.",
    }),
    number: Joi.string().optional().messages({
        "string.empty": "The number field is required.",
        "string.email": "The number must be a valid email.",
    }),
    password: Joi.string().min(6).max(15).required().messages({
        "string.empty": "The password field is required.",
        "string.min": "The password field min 6 characters required.",
        "string.max": "The password field max 15 characters required.",
    }),
    profileImage: Joi.any(),
});
