import { NextFunction, Request, Response } from 'express'
const AppError = require('../utils/appError')
import StatusCode from './httpStatusCode'
interface GlobalError {
  statusCode: number
  status: string
  operational: boolean
  code: number
  errmsg: string
}
type SendError = Error & GlobalError

const sendErrorDev = (error: SendError, response: Response) => {
  response.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    stack: error.stack,
    error: error,
  })
}

const sendErrorProd = (error: SendError, response: Response) => {
  //-------------Operational , Send to client
  if (error.operational) {
    response.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    })
  } else {
    //---------------Programming Error, Dont send to client
    console.error(error, '<=-=-=-=-=-= || Error ||=-=-=-=-=>')
    response.status(StatusCode.INTERNAL_SERVER).json({
      status: 'Error',
      message: 'Something went wrong!',
    })
  }
}

const handlerCastErrorDB = (err: any) => {
  const message = `Invalid ${err.path}:${err.value}`
  return new AppError(message, 400)
}

const handlerDuplicatedErrorDB = (err: any) => {
  const value = err.errmsg.match(/dup key: { name: "(.*)" }/)
  const message = `Duplicated Filed Value:${value[1]} & Please Use another Value!`
  return new AppError(message, 400)
}

const handlerValidationErrorDB = (err: any) => {
  const error = Object.values(err.errors).map((el: any) => el.message)
  const message = `Invalid Input Filed ${error.join('. ')}`
  return new AppError(message, 400)
}

module.exports = (
  error: SendError,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  error.statusCode = error.statusCode || 500
  error.status = error.status || 'error'
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(error, response)
  } else if (process.env.NODE_ENV === 'production') {
    let err = {
      ...error,
      name: error.name,
      message: error.message,
      errmsg: error.errmsg,
      code: error.code,
    }
    if (err.name === 'CastError') err = handlerCastErrorDB(err)
    if (err.code === 11000) err = handlerDuplicatedErrorDB(err)
    if (err.name === 'ValidationError') err = handlerValidationErrorDB(err)
    sendErrorProd(err, response)
  }
}
