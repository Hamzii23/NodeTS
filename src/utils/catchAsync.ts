import { NextFunction, Request, Response } from 'express'

type AsyncFunction = (
  request: Request,
  response: Response,
  next: NextFunction,
) => Promise<any>

const catchAsync = (fn: AsyncFunction) => {
  return (request: Request, response: Response, next: NextFunction) => {
    fn(request, response, next).catch(next)
  }
}
module.exports = catchAsync
