export const STORAGE_PATH = "public/storage";

export const HTTP_STATUS_CODE = {
    ACCEPTED: 299,
    SUCCESS: 200,
    INTERNAL_SERVER: 500,
    UNPROCESSABLE: 422,
    CONFLICT: 409,
    NOT_FOUND: 404,
    FORBIDDEN: 403,
    UNAUTHORIZE: 401,
    BAD_REQUEST: 400,
};

export const PROVIDER_TYPES = {
    NORMAL: "normal",
    APPLE: "apple",
    GOOGLE: "google",
    FACEBOOK: "facebook",
};

export const DEVICE_TYPES = {
    IOS: "ios",
    ANDROID: "android",
};

export const PLAN_PERIODS = {
    DAY: "day",
    WEEK: "week",
    MONTH: "month",
    YEAR: "year",
    LIFETIME: "lifetime",
};
