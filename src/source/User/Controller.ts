import { NextFunction, Request, Response } from 'express'
import UserFunc from './Bussiness'

const catchAsync = require('../../utils/catchAsync')
const AppError = require('../../utils/appError')

const getAllUsers = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    const user = await UserFunc.getAllUser()
    if (!user.success) return next(new AppError(user.message, user.statusCode))
    response
      .status(user.statusCode)
      .json({ message: user.message, sucess: user.success, data: user.data })
  },
)

const updateMe = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    const newUser = await UserFunc.updateMe(request)
    if (!newUser?.success) {
      return next(new AppError(newUser?.message, newUser?.statusCode))
    }
    response.status(newUser.statusCode).json({
      success: newUser.success,
      message: newUser.message,
      data: newUser.data,
    })
  },
)

const deleteMe = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    const deleteUser = await UserFunc.deleteMe(request)
    response.status(deleteUser.statusCode).json({
      success: deleteUser.success,
      message: deleteUser.message,
      data: deleteUser.data,
    })
  },
)

export { getAllUsers, updateMe, deleteMe }
