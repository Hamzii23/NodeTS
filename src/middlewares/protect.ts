import { NextFunction, Response } from 'express'
import { verifyJWTToken } from '../utils/jwtToken'
import { User } from '../source/User/Schema'
import { AuthRequest, UserDocument } from '../source/User/types'

const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')

const protect = catchAsync(
  async (request: AuthRequest, response: Response, next: NextFunction) => {
    let token
    // 1) check token
    if (
      request.headers.authorization &&
      request.headers.authorization.startsWith('Bearer')
    ) {
      token = request.headers.authorization.split(' ')[1]
    }
    if (!token) {
      return next(
        new AppError('You are not logged in! Please Login to get access', 401),
      )
    }

    // 2) validate the token
    const verifyToken = await verifyJWTToken(token)

    // 3) check user is exit or not
    const freshUser = await User.findById<UserDocument>(verifyToken.id)
    if (!freshUser) {
      return next(
        new AppError('The user belonging to this token no longer exist', 401),
      )
    }
    // 4) check if user changed password after issue the Token
    if (await freshUser.changedPasswordAfter(verifyToken.iat)) {
      return next(
        new AppError(
          'The user Recently Change the Password! Please Login Again',
          401,
        ),
      )
    }
    // GRAND ACCESS TO PROTECTED ROUTE
    request.user = freshUser
    next()
  },
)

const restrictToRole = (...roles: string[]) => {
  return (request: AuthRequest, response: Response, next: NextFunction) => {
    if (request.user && !roles.includes(request.user?.role)) {
      return next(
        new AppError('You dont have permission to perform this action', 403),
      )
    }
    next()
  }
}
export { protect, restrictToRole }
