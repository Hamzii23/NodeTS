const catchAsync = require('../../utils/catchAsync')
const AppError = require('../../utils/appError')
import AuthFuns from './Bussiness'
import { NextFunction, Request, Response } from 'express'

const signUp = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    const newUser = await AuthFuns.createUser(request)
    response.status(201).json({ newUser })
  },
)

const login = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    const getUser = await AuthFuns.loginUser(request)
    if (!getUser?.success) {
      return next(new AppError(getUser?.message, getUser?.statusCode))
    }
    response.status(getUser.statusCode).json({ getUser })
  },
)

const forgotPassword = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    const result = await AuthFuns.forgotPassword(request)
    if (!result?.success) {
      return next(new AppError(result?.message, result?.statusCode))
    }
    response
      .status(result.statusCode)
      .json({ message: result.message, status: result.success })
  },
)

const resetPassword = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    const result = await AuthFuns.resetPassword(request)
    if (!result?.success) {
      return next(new AppError(result?.message, result?.statusCode))
    }
    response.status(result.statusCode).json({
      message: result.message,
      status: result.success,
      token: result.token,
    })
  },
)

const updatePassword = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    const result = await AuthFuns.updatePassword(request)
    if (!result?.success) {
      return next(new AppError(result?.message, result?.statusCode))
    }
    response.status(result.statusCode).json({
      message: result.message,
      status: result.success,
      token: result.token,
      data: result.data,
    })
  },
)

export { signUp, login, resetPassword, forgotPassword, updatePassword }
