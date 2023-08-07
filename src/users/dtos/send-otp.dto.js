import Joi from "joi";

export default Joi.object({
    email: Joi.string().required().messages({
        "string.empty": "The email field is required.",
    }),
    type: Joi.string().valid("forgotPassword", "emailVerify").messages({
        "string.empty": "The type field is required.",
    }),
});
