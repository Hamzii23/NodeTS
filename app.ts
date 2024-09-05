import express, { Request, Response, NextFunction } from 'express'
import toursRoutes from '../Node/src/Tours/Routes'
import morgan from 'morgan'
const AppError = require('./src/utils/appError')
const globalErrorHandler = require('./src/utils/globalError')
const app = express()
if (process.env.NODE_ENV == 'development') {
  app.use(morgan('dev'))
}
app.use(express.json())

app.use('/api/v1/tours', toursRoutes)

app.all('*', (request, response, next) => {
  next(new AppError(`Can't find ${request.originalUrl} on this server`, 404))
})
app.use(globalErrorHandler)

export default app
