import { NextFunction, Request, Response } from 'express'
interface GlobalError {
  statusCode: number
  status: string
}
module.exports = (
  error: Error & GlobalError,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  error.statusCode = error.statusCode || 500
  error.status = error.status || 'error'
  response.status(error.statusCode).json({
    status: error.status,
    message: error.message,
  })
}
