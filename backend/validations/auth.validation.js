import Joi from "joi";

export const registerValidation = Joi.object({
    fullName: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            "string.empty": "Full name is required",
            "string.min": "Full name must be at least 3 characters",
            "string.max": "Full name must be less than 50 characters"
        }),
    email: Joi.string()
        .email()
        .required()
        .messages({
            "string.empty": "Email is required",
            "string.email": "Please provide a valid email address"
        }),
    password: Joi.string()
        .min(8)
        .pattern(new RegExp("^(?=.*[0-9])(?=.*[!@#$%^&*])"))
        .required()
        .messages({
            "string.empty": "Password is required",
            "string.min": "Password must be at least 8 characters",
            "string.pattern.base": "Password must contain at least one number and one special character (!@#$%^&*)"
        })
});

export const updateProfileValidation = Joi.object({
    fullName: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            "string.empty": "Full name is required",
            "string.min": "Full name must be at least 3 characters",
            "string.max": "Full name must be less than 50 characters"
        }),
    email: Joi.string()
        .email()
        .required()
        .messages({
            "string.empty": "Email is required",
            "string.email": "Please provide a valid email address"
        })
})