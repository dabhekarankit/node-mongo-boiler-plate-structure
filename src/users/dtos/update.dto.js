import Joi from "joi";

export default Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
    number: Joi.string().optional(),
    profileImage: Joi.any(),
});
