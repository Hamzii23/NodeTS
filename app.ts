import express from 'express'
import { rateLimit } from 'express-rate-limit'
import helmet from 'helmet'

import toursRoutes from '../Node/src/source/Tours/Routes'
import AuthRoutes from '../Node/src/source/Auth/Routes'
import userRoutes from '../Node/src/source/User/Routes'
import morgan from 'morgan'
import logger from './src/utils/logger'

const AppError = require('./src/utils/appError')
const globalErrorHandler = require('./src/utils/globalError')
const mongoSanitize = require('express-mongo-sanitize')
const hpp = require('hpp')
const app = express()

// Set Security HTTP Headers
app.use(helmet())

// Development Logging
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

//Limit Request from API
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: 'To many request from this IP, Please Try in an Hour',
})
app.use('/api', limiter)

//Body Paser , reading Data from body into req.body
app.use(express.json({ limit: '10kb' }))

// Data sanitization against NoSQL query injection
app.use(mongoSanitize())
// Data sanitization against Cross-site scripting attacks (XSS)

// protect against HTTP Parameter Pollution attacks
app.use(hpp({ whitelist: ['duration'] }))
//Routes
app.use('/api/v1/auth', AuthRoutes)
app.use('/api/v1/tours', toursRoutes)
app.use('/api/v1/users', userRoutes)

// Not Found URL
app.all('*', (request, response, next) => {
  next(new AppError(`Can't find ${request.originalUrl} on this server`, 404))
})

app.use(globalErrorHandler)

export default app
