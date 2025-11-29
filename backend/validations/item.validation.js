import Joi from "joi";

export const itemValidation = Joi.object({
    itemName: Joi.string()
        .min(1)
        .max(100)
        .trim()
        .required()
        .messages({
            'string.empty': 'Item name is required',
            'string.min': 'Item name must be at least 1 character',
            'string.max': 'Item name cannot exceed 100 characters',
            'any.required': 'Item name is required'
        }),

    itemDescription: Joi.string()
        .min(1)
        .max(500)
        .trim()
        .allow('')
        .optional()
        .messages({
            'string.min': 'Item description must be at least 1 character',
            'string.max': 'Item description cannot exceed 500 characters'
        }),

    price: Joi.number()
        .required()
        .min(0)
        .positive()
        .messages({
            'number.base': 'Price must be a number',
            'number.min': 'Price cannot be negative',
            'number.positive': 'Price must be greater than 0',
            'any.required': 'Price is required'
        }),

    discount: Joi.number()
        .optional()
        .min(0)
        .max(100)
        .default(0)
        .messages({
            'number.base': 'Discount must be a number',
            'number.min': 'Discount cannot be negative',
            'number.max': 'Discount cannot exceed 100%'
        }),

    category: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .allow(null, '')
        .optional()
        .messages({
            'string.pattern.base': 'Invalid category ID format'
        }),

    isAvailable: Joi.boolean()
        .optional()
        .messages({
            'boolean.base': 'isAvailable must be true or false'
        }),

    tag: Joi.alternatives()
        .try(
            Joi.array().items(Joi.string().trim()),
            Joi.string()
        )
        .optional()
        .messages({
            'alternatives.types': 'Tags must be an array or string'
        })
});