import app from './app'
import mongoose from 'mongoose'
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })

const DB = process.env.DATABASE!.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD!,
)
mongoose
  .connect(DB)
  .then(conn => {
    console.log('DB Sucessfully Connected')
  })
  .catch(error => {
    console.log(error)
  })

const PORT: number | string = process.env.PORT || 3000
console.log(process.env.NODE_ENV)
const server = app
  .listen(PORT, () => {
    console.log('Server running at PORT: ', PORT)
  })
  .on('error', (error: { message: string }) => {
    throw new Error(error.message)
  })
