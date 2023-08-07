import Joi from "joi";
import { PROVIDER_TYPES } from "../../../common/helpers/constants.helper";

export default Joi.object({
    providerType: Joi.string()
        .valid(PROVIDER_TYPES.APPLE, PROVIDER_TYPES.GOOGLE, PROVIDER_TYPES.FACEBOOK)
        .required()
        .messages({
            "string.empty": "The provider type field is required.",
        }),
    token: Joi.string()
        .when("providerType", { is: PROVIDER_TYPES.FACEBOOK, then: Joi.string().required() })
        .when("providerType", { is: PROVIDER_TYPES.GOOGLE, then: Joi.string().allow("") }),

    providerId: Joi.string()
        .when("providerType", { is: PROVIDER_TYPES.GOOGLE, then: Joi.string().required() })
        .when("providerType", { is: PROVIDER_TYPES.FACEBOOK, then: Joi.string().allow("") }),

    profileImage: Joi.string()
        .when("providerType", { is: PROVIDER_TYPES.GOOGLE, then: Joi.string().required() })
        .when("providerType", { is: PROVIDER_TYPES.FACEBOOK, then: Joi.string().allow("") }),

    profileImage: Joi.string()
        .when("providerType", { is: PROVIDER_TYPES.GOOGLE, then: Joi.string().required() })
        .when("providerType", { is: PROVIDER_TYPES.FACEBOOK, then: Joi.string().allow("") }),

    name: Joi.string()
        .when("providerType", { is: PROVIDER_TYPES.GOOGLE, then: Joi.string().required() })
        .when("providerType", { is: PROVIDER_TYPES.FACEBOOK, then: Joi.string().allow("") }),

    email: Joi.string()
        .when("providerType", { is: PROVIDER_TYPES.GOOGLE, then: Joi.string().required() })
        .when("providerType", { is: PROVIDER_TYPES.FACEBOOK, then: Joi.string().allow("") }),

    number: Joi.any(),
});
