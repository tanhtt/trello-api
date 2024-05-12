/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

// https://joi.dev/api/?v=17.13.0

import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'

// Backend must be validata data
// To custom message use .messages()

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().messages({
      'any.required': 'Title is required',
      'string.empty': 'Title is not allowed to be empty',
      'string.min': 'Title length must be at least 3 characters long',
      'string.max': 'Title length must be less than or equal 50 characters long',
      'string.trim': 'Title must not have leading or trail whitespace'
    }),
    description: Joi.string().required().min(3).max(250).trim().strict()
  })

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })

    // res.status(StatusCodes.CREATED).json({ message: 'POST from validation: API create new board' })
    next()
  } catch (error) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: new Error(error).message
    })
  }
}

export const boardValidation = {
  createNew
}
