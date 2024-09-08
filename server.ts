import mongoose from 'mongoose'
const dotenv = require('dotenv')

process.on('uncaughtException', (error: Error) => {
  console.log(error, 'Error')
  process.exit(1)
})

dotenv.config({ path: './config.env' })
import app from './app'

const DB = process.env.DATABASE!.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD!,
)

mongoose.connect(DB).then(_conn => {
  console.log('DB Sucessfully Connected')
})

const PORT: number | string = process.env.PORT || 3000
console.log(process.env.NODE_ENV)

const server = app.listen(PORT, () => {
  console.log('Server running at PORT: ', PORT)
})

process.on('unhandledRejection', (error: Error) => {
  console.log(error.name, 'Error')
  server.close(() => {
    process.exit(1)
  })
})
