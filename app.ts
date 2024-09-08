import express from 'express'
import toursRoutes from '../Node/src/Tours/Routes'
import morgan from 'morgan'
import logger from './src/utils/logger'
const AppError = require('./src/utils/appError')
const globalErrorHandler = require('./src/utils/globalError')
const app = express()
app.use(express.json())

const morganFormat =
  ':method :url :status :res[content-length] - :response-time ms'

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
  app.use(
    morgan(morganFormat, {
      stream: {
        write: message => {
          const logObj = {
            method: message.split(' ')[0],
            url: message.split(' ')[1],
            status: message.split(' ')[2],
            responseTime: message.split(' ')[3],
          }
          logger.info(JSON.stringify(logObj))
        },
      },
    }),
  )
}

app.use('/api/v1/tours', toursRoutes)

app.all('*', (request, response, next) => {
  next(new AppError(`Can't find ${request.originalUrl} on this server`, 404))
})
app.use(globalErrorHandler)

export default app
