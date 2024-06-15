const Joi = require('joi');
const { StatusCodes } = require('http-status-codes');
const ApiError = require('../utils/ApiError');

const createUser = async (req, res, next) => {
    const createSchema = Joi.object({
        name: Joi.string().required().min(3).max(100).trim().strict().messages({
            'any.required': 'Name is required',
            'string.empty': 'Name is not allowed to be empty (custom)',
        }),
        age: Joi.number().required(),
    });
    try {
        await createSchema.validateAsync(req.body, {
            abortEarly: false,
        });
        next();
    } catch (error) {
        const errors = error?.details?.map((i) => ({
            fieldname: i?.path?.join(', '),
            message: i?.message?.replace(/\"/g, ''),
        }));
        next(
            new ApiError(
                StatusCodes.UNPROCESSABLE_ENTITY,
                new Error(error).message.replace(/\"/g, '').replace('.', ','),
                errors,
            ),
        );
    }
};

module.exports = { createUser };
