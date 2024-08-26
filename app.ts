import express from 'express'
import toursRoutes from '../Node/src/Tours/Routes'
import morgan from 'morgan'
const app = express()
if (process.env.NODE_ENV == 'development') {
  app.use(morgan('dev'))
}
app.use(express.json())

app.use('/api/v1/tours', toursRoutes)

export default app
